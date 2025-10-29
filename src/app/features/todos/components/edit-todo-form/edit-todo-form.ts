import { ChangeDetectionStrategy, Component, computed, effect, inject, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { EStatus, ToDoListItem } from '../../../types/types';
import { MatInputModule } from '@angular/material/input';
import { TodosService } from '../../services/todos/todos.service';
import { TooltipDirective } from '../../../../lib/directives/tooltip/tooltip';
import { TodosStateService } from '../../services/todos-state/todos-state-service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, NgForm } from '@angular/forms';
import { AppButton } from '../../../../lib/ui/app-button/app-button';
import { MatCardModule } from '@angular/material/card';

type DataToSave = {
  title: string;
  description: string;
  status: boolean;
}

@Component({
  selector: 'app-edit-todo-form',
  imports: [
    FormsModule,

    MatInputModule,
    MatCheckboxModule,
    MatCardModule,

    AppButton,
    TooltipDirective,
  ],
  templateUrl: './edit-todo-form.html',
  styleUrl: './edit-todo-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTodoFormComponent {

  private todosService = inject(TodosService);
  private todosStateService = inject(TodosStateService);

  isEditMode = this.todosStateService.isEditMode;

  constructor() {
    // Синхронизация при изменении selectedItem
    effect(() => {
      const selectedItem: ToDoListItem = this.selectedItem();
      this.dataToSave.set({
        title: selectedItem.title,
        description: selectedItem.description,
        status: selectedItem.status === EStatus.COMPLETED
      });
    });
  }

  selectedItem: Signal<ToDoListItem> = computed(() => {
    const item = this.todosStateService.selectedItem();
    console.log('form computed signal item', item)
    if (!item) {
      throw new Error('Selected item is null in EditTodoFormComponent - this should never happen');
    }
    return item;
  });


  // dataToSave - это данные для сохранения
  dataToSave: WritableSignal<DataToSave> = signal({
    title: '',
    description: '',
    status: false,
  });


  EStatus = EStatus;

  editForm = viewChild<NgForm>('editForm');

  title = computed(() => {
    return this.isEditMode()
      ? 'Редактировать задачу'
      : 'Просмотр задачи';
  })

  isFormDirty = computed(() => {
    const dataToSave = this.dataToSave();
    const selectedItem = this.selectedItem();
    return dataToSave?.title !== selectedItem?.title
      || dataToSave?.description !== selectedItem?.description;
  })

  get isSaveDisabled(): boolean {
    // null рассматриваем как "форма не валидна"
    return (this.editForm()?.pristine ?? true) || (this.editForm()?.invalid ?? true);
  }

  save() {
    const data = this.dataToSave();
    this.todosService.editTodo({
      ...data,
      id: this.selectedItem().id,
      status: data.status ? EStatus.COMPLETED : EStatus.IN_PROGRESS,
    });
    this.resetFormState();
  }

  resetFormState () {
    this.editForm()?.form.markAsPristine();
  }
}
