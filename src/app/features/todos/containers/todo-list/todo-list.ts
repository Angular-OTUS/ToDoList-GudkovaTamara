import { ChangeDetectionStrategy, Component, inject, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { ToDoListItem } from '../../../types/types';
import { FormsModule } from '@angular/forms';
import { ToDoListItemComponent } from '../../components/todo-list-item/todo-list-item';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { TooltipDirective } from '../../../../lib/directives/tooltip/tooltip';
import { TodosService } from '../../services/todos/todos.service';
import { EditTodoFormComponent } from '../../components/edit-todo-form/edit-todo-form';
import { TodosStateService } from '../../services/todos-state/todos-state-service';
import { Observable } from 'rxjs';
import { AppButton } from '../../../../lib/ui/app-button/app-button';

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
  private todosStateService: TodosStateService = inject(TodosStateService);

  todos: Signal<ToDoListItem[]> = this.todosStateService.todos;
  todos$: Observable<ToDoListItem[]> = new Observable<ToDoListItem[]>();
  newTodoData: ToDoListItem = {} as ToDoListItem;
  itemsCount: Signal<number> = this.todosService.countTodos;
  isLoading: WritableSignal<boolean> = this.todosService.isLoading;
  selectedItem: Signal<ToDoListItem | null> = this.todosStateService.selectedItem;

  addItem() {
    this.todosService.addTodo(this.newTodoData);
    this.newTodoData = {} as ToDoListItem;
  }

  ngOnInit() {
    this.todosService.loadTodos();
  }
}
