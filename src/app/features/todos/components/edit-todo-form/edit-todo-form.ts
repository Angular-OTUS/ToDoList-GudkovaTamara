import { ChangeDetectionStrategy, Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { ToDoListItem } from '../../../types/types';
import { MatInputModule } from '@angular/material/input';
import { AppButton } from '../../../../lib/ul/app-button/app-button';
import { TodosService } from '../../services/todos/todos.service';
import { TooltipDirective } from '../../../../lib/directives/tooltip/tooltip';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { TodosStateService } from '../../services/todos-state/todos-state-service';

@Component({
  selector: 'app-edit-todo-form',
  imports: [
    MatInputModule,

    AppButton,
    TooltipDirective,
  ],
  templateUrl: './edit-todo-form.html',
  styleUrl: './edit-todo-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTodoFormComponent {

  private todosService = inject(TodosService);
  private toastService = inject(ToastService);
  private todosStateService = inject(TodosStateService);

  isEditMode = this.todosStateService.isEditMode;
  selectedItem = this.todosStateService.selectedItem;

  title = computed(() => {
    return this.isEditMode()
      ? 'Редактировать задачу'
      : 'Просмотр задачи';
  })

  private dataToSave: WritableSignal<ToDoListItem | null> = signal(this.selectedItem());

  isFormDirty = computed(() => {
    const dataToSave = this.dataToSave();
    const selectedItem = this.selectedItem();
    return dataToSave?.title !== selectedItem?.title
      || dataToSave?.description !== selectedItem?.description;
  })

  updateTitle(evt: Event) {
    const item = this.selectedItem();
    if (item) {
      this.dataToSave.set({
        ...item,
        title: (evt.target as HTMLInputElement).value
      })
    }
  }

  updateDescription(evt: Event) {
    const item = this.selectedItem();
    if (item) {
      this.dataToSave.set({
        ...item,
        description: (evt.target as HTMLInputElement).value
      })
    }
  }

  save() {
    this.todosService.editTodo(this.dataToSave()!);
    this.toastService.showSuccess('Задача успешно обновлена');
  }
}
