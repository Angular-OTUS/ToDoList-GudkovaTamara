import { ChangeDetectionStrategy, Component, inject, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { ToDoListItem } from '../../../types/types';
import { AppButton } from '../../../../lib/ul/app-button/app-button';
import { MatCardModule } from '@angular/material/card';
import { TooltipDirective } from '../../../../lib/directives/tooltip/tooltip';
import { TodosStateService } from '../../services/todos-state/todos-state-service';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { TodosService } from '../../services/todos/todos.service';

@Component({
  selector: 'todo-list-item',
  imports: [
    AppButton,
    MatCardModule,
    TooltipDirective,
  ],
  templateUrl: './todo-list-item.html',
  styleUrl: './todo-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListItemComponent {

  private todosStateService = inject(TodosStateService);
  private todosService = inject(TodosService);
  private toastService = inject(ToastService);

  item: InputSignal<ToDoListItem> = input.required<ToDoListItem>();
  deleted: OutputEmitterRef<ToDoListItem['id']> = output<ToDoListItem['id']>();

  isSelected () {
    return this.item().id === this.todosStateService.selectedItem()?.id
  }

  selectItem() {
    this.todosStateService.selectItem(this.item());
  }

  handleDblClick() {
    this.todosStateService.editItem(this.item());
  }

  deleteItem (id: number) {
    this.todosService.deleteTodo(id);
    this.toastService.showSuccess('Задача успешно удалена');
  }
}
