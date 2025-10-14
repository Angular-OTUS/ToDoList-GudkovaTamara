import { ChangeDetectionStrategy, Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ToDoListItem } from '../../../types/types';
import { FormsModule } from '@angular/forms';
import { ToDoListItemComponent } from '../../components/todo-list-item/todo-list-item';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppButton } from '../../../../lib/ul/app-button/app-button';
import { MatCardModule } from '@angular/material/card';
import { TooltipDirective } from '../../../../lib/directives/tooltip/tooltip';
import { TodosService } from '../../services/todos/todos.service';
import { EditTodoFormComponent } from '../../components/edit-todo-form/edit-todo-form';
import { ToastService } from '../../../../core/services/toast/toast.service';

@Component({
  selector: 'app-to-do-list',
  imports: [
    FormsModule,
    ToDoListItemComponent,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,

    TooltipDirective,
    EditTodoFormComponent,
    AppButton,
  ],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListComponent implements OnInit {

  private todosService: TodosService = inject(TodosService);
  private toastService: ToastService = inject(ToastService);

  toDoItems: Signal<ToDoListItem[]> = this.todosService.todos;
  newTodoData: ToDoListItem = {} as ToDoListItem;
  itemsCount: Signal<number> = this.todosService.countTodos;
  isLoading: WritableSignal<boolean> = signal(true);
  selectedItem: WritableSignal<ToDoListItem | null> = signal(null);

  deleteItem (id: number) {
    this.todosService.deleteTodo(id);
  }

  addItem () {
    this.todosService.addTodo(this.newTodoData);
    this.newTodoData = {} as ToDoListItem;
    this.toastService.showSuccess('Задача успешно добавлена');
  }

  showSelectedItemContent($event: ToDoListItem): void {
    this.selectedItem.set($event);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }
}
