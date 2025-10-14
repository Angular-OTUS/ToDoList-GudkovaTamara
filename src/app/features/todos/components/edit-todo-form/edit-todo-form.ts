import { ChangeDetectionStrategy, Component, effect, inject, input, InputSignal } from '@angular/core';
import { ToDoListItem } from '../../../types/types';
import { MatInputModule } from '@angular/material/input';
import { AppButton } from '../../../../lib/ul/app-button/app-button';
import { TodosService } from '../../services/todos/todos.service';
import { TooltipDirective } from '../../../../lib/directives/tooltip/tooltip';
import { ToastService } from '../../../../core/services/toast/toast.service';

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

  data: InputSignal<ToDoListItem> = input.required<ToDoListItem>();
  dataToSave: ToDoListItem | null = null;

  constructor() {
    effect(() => {
      this.dataToSave = this.data();
    });
  }

  updateTitle(evt: Event) {
    if (this.dataToSave) {
      this.dataToSave = {
        ...this.dataToSave,
        title: (evt.target as HTMLInputElement).value
      };
    }
  }

  updateDescription(evt: Event) {
    if (this.dataToSave) {
      this.dataToSave = {
        ...this.dataToSave,
        description: (evt.target as HTMLInputElement).value
      };
    }
  }

  save() {
    if (this.dataToSave) {
      this.todosService.editTodo(this.dataToSave);
    }
    this.toastService.showSuccess('Задача успешно обновлена');
  }
}
