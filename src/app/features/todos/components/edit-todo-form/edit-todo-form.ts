import { ChangeDetectionStrategy, Component, computed, effect, inject, input, Signal, signal, viewChild, WritableSignal } from '@angular/core';
import { EStatus, ToDoListItem } from '../../../types/types';
import { MatInputModule } from '@angular/material/input';
import { TodosService } from '../../services/todos/todos.service';
import { TooltipDirective } from '../../../../lib/directives/tooltip/tooltip';
import { TodosStateService } from '../../services/todos-state/todos-state-service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, NgForm } from '@angular/forms';
import { AppButton } from '../../../../lib/ui/app-button/app-button';
import { MatCardModule } from '@angular/material/card';

interface DataToSave {
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTodoFormComponent {

  private todosService = inject(TodosService);
  private todosStateService = inject(TodosStateService);

  itemId = input<number | null>(null);
  editForm = viewChild<NgForm>('editForm');

  isEditMode = this.todosStateService.isEditMode;
  EStatus = EStatus;

  constructor() {
    // Синхронизация при изменении selectedItem
    effect(() => {
      const selectedItem = this.item();

      if (!selectedItem) {
        return;
      }
      this.dataToSave.set({
        title: selectedItem.title,
        description: selectedItem.description,
        status: selectedItem.status === EStatus.COMPLETED,
      });
    });
  }

  item: Signal<ToDoListItem | null> = computed(() => {
    const itemId: number | null = this.itemId();
    if (!itemId) {
      throw new Error('Selected item is null in EditTodoFormComponent - this should never happen');
    }

    return this.todosStateService.todos().find((item) => item.id === itemId) ?? null;
  });


  // dataToSave - это данные для сохранения
  dataToSave: WritableSignal<DataToSave> = signal({
    title: '',
    description: '',
    status: false,
  });

  title = computed(() => {
    return this.isEditMode()
      ? 'Редактировать задачу'
      : 'Просмотр задачи';
  })

  isFormDirty = computed(() => {
    const dataToSave = this.dataToSave();
    const selectedItem = this.item();
    return dataToSave?.title !== selectedItem?.title
      || dataToSave?.description !== selectedItem?.description;
  })

  get isSaveDisabled(): boolean {
    // null рассматриваем как "форма не валидна"
    return (this.editForm()?.pristine ?? true) || (this.editForm()?.invalid ?? true);
  }

  save() {
    const itemId = this.item()?.id;

    if (!itemId) {
      return;
    }
    const data = this.dataToSave();
    this.todosService.editTodo({
      ...data,
      id: itemId,
      status: data.status ? EStatus.COMPLETED : EStatus.IN_PROGRESS,
    });
    this.resetFormState();
  }

  resetFormState () {
    this.editForm()?.form.markAsPristine();
  }
}
