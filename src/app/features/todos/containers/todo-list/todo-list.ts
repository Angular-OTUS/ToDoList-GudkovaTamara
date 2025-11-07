import { ChangeDetectionStrategy, Component, computed, effect, inject, input, InputSignal, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { EStatus, ToDoListItem } from '../../../types/types';
import { FormsModule } from '@angular/forms';
import { ToDoListItemComponent } from '../../components/todo-list-item/todo-list-item';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodosService } from '../../services/todos/todos.service';
import { EditTodoFormComponent } from '../../components/edit-todo-form/edit-todo-form';
import { TodosStateService } from '../../services/todos-state/todos-state-service';
import { NewTodoFormComponent } from '../../components/new-todo-form/new-todo-form';
import { SpinnerComponent } from '../../../../lib/ui/spinner/spinner';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';

enum EStatusFilter {
  ALL = 'all',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed',
}

@Component({
  selector: 'app-todo-list',
  imports: [
    FormsModule,
    ToDoListItemComponent,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,

    EditTodoFormComponent,
    NewTodoFormComponent,
    SpinnerComponent,
  ],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListComponent implements OnInit {

  private todosService: TodosService = inject(TodosService);
  private todosStateService: TodosStateService = inject(TodosStateService);

  // Порядок generic параметров для input:
  // Первый параметр: Выходной тип
  // Второй параметр: Входной тип
  selectedItemId = input.required<number, string>({
    transform: (value: string) => +value
  });

  todos: Signal<ToDoListItem[]> = this.todosStateService.todos;
  filterValue: WritableSignal<EStatusFilter> = signal(EStatusFilter.ALL);

  itemsCount: Signal<number> = this.todosService.countTodos;
  isLoading: WritableSignal<boolean> = this.todosService.isLoading;
  EStatusFilter = EStatusFilter;

  filteredTodos = computed(() => {
    const filter = this.filterValue();

    switch (filter) {
      case EStatusFilter.IN_PROGRESS:
        return this.todos().filter((todo) => todo.status === EStatus.IN_PROGRESS);
      case EStatusFilter.COMPLETED:
        return this.todos().filter((todo) => todo.status === EStatus.COMPLETED);
      default:
        return this.todos();
    }
  });

  ngOnInit() {
    this.todosService.loadTodos();
  }

  // Обработчик изменения фильтра
  onFilterChange(event: MatButtonToggleChange) {
    const newFilter = event.value;
    this.filterValue.set(newFilter);
    console.log('Фильтр изменен на:', newFilter);
  }
}
