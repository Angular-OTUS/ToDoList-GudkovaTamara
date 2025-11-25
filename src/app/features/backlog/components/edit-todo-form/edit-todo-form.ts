import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, OnInit, viewChild } from '@angular/core';
import { EStatus, ToDoListItem } from '../../../types/types';
import { MatInputModule } from '@angular/material/input';
import { TooltipDirective } from '../../../../lib/directives/tooltip/tooltip';
import { TodosStateService } from '../../../../store/todos-state/todos-state-service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, NgForm } from '@angular/forms';
import { AppButton } from '../../../../lib/ui/app-button/app-button';
import { MatCardModule } from '@angular/material/card';
import { TodosDataService } from '../../../../api/todos-data/todos-data.service';
import { BacklogStateService } from '../../services/basckog-state/backlog-state';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { useDynamicTranslation } from '../../../../utils/transloco.utils';

interface DataToSave {
  title: string;
  description: string;
  status: boolean;
}

@Component({
  selector: 'app-edit-todo-form',
  imports: [
    FormsModule,
    AsyncPipe,
    TranslocoPipe,

    MatInputModule,
    MatCheckboxModule,
    MatCardModule,

    AppButton,
    TooltipDirective,
  ],
  templateUrl: './edit-todo-form.html',
  styleUrl: './edit-todo-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTodoFormComponent implements OnInit {

  private route = inject(ActivatedRoute);

  private todosDataService = inject(TodosDataService);
  private todosStateService = inject(TodosStateService);
  private backlogStateService = inject(BacklogStateService);
  private destroyRef = inject(DestroyRef);
  private transloco = inject(TranslocoService);

  selectedItemId = input.required<number>();
  form = viewChild<NgForm>('form');

  isEditMode = this.backlogStateService.isEditMode;
  EStatus = EStatus;

    // dataToSave - это данные для сохранения
  dataToSaveSubj: BehaviorSubject<DataToSave> = new BehaviorSubject<DataToSave>({
    title: '',
    description: '',
    status: false,
  });

  dataToSave$ = this.dataToSaveSubj.asObservable();

  item$: Observable<ToDoListItem | null> = combineLatest([
    this.todosStateService.todos$,
    toObservable(this.selectedItemId),
  ]).pipe(
    map(([todos, id]: [ToDoListItem[], number]) => {
      return todos.find((item) => item.id === id) ?? null;
    })
  )

  title = useDynamicTranslation(() =>
    this.isEditMode() ? 'taskForm.editTask' : 'taskForm.viewTask'
  );

  isFormDirty: Observable<boolean> = combineLatest([
    this.dataToSave$,
    this.item$,
  ]).pipe(
    map(([dataToSave, selectedItem]) => {
      return dataToSave?.title !== selectedItem?.title
        || dataToSave?.description !== selectedItem?.description;
    })
  )

    get isSaveDisabled(): boolean {
      // null рассматриваем как "форма не валидна"
      return (this.form()?.pristine ?? true) || (this.form()?.invalid ?? true);
    }

    updateDataToSave(evt: Partial<DataToSave>) {
      const prevDataToSave = this.dataToSaveSubj.getValue();
      console.log('updateDataToSave', evt);
      this.dataToSaveSubj.next({
        ...prevDataToSave,
        ...evt,
      });
  }

  save() {
    const itemId = this.selectedItemId();

    if (!itemId) {
      return;
    }
    const data = this.dataToSaveSubj.getValue();
    this.todosDataService.editTodo({
      ...data,
      id: itemId,
      status: data.status ? EStatus.COMPLETED : EStatus.IN_PROGRESS,
    });
    this.resetFormState();
  }

  resetFormState() {
    this.form()?.form.markAsPristine();
  }

  ngOnInit(): void {
    this.item$.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((item) => {
      this.dataToSaveSubj.next({
        title: item?.title ?? '',
        description: item?.description ?? '',
        status: item?.status === EStatus.COMPLETED,
      })
    })
  }
}
