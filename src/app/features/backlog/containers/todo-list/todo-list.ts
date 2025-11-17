import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { EStatus, ToDoListItem } from '../../../types/types';
import { FormsModule } from '@angular/forms';
import { ToDoListItemComponent } from '../../../todos/components/todo-list-item/todo-list-item';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TodosStateService } from '../../../../store/todos-state/todos-state-service';
import { SpinnerComponent } from '../../../../lib/ui/spinner/spinner';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { TodosDataService } from '../../../../api/todos-data/todos-data.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

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
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,

    SpinnerComponent,
  ],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListComponent implements OnInit {

  private todosDataService: TodosDataService = inject(TodosDataService);
  private todosStateService: TodosStateService = inject(TodosStateService);

  destroyRef = inject(DestroyRef);

  // Порядок generic параметров для input:
  // Первый параметр: Выходной тип
  // Второй параметр: Входной тип
  selectedItemId = input.required<number>();

  todos: Signal<ToDoListItem[]> = this.todosStateService.todos;
  filterValue: WritableSignal<EStatusFilter> = signal(EStatusFilter.ALL);

  itemsCount: Signal<number> = this.todosDataService.countTodos;
  isLoading: WritableSignal<boolean> = this.todosDataService.isLoading;
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
    this.todosDataService.loadTodos();
  }

  onFilterChange(event: MatButtonToggleChange) {
    const newFilter = event.value;
    this.filterValue.set(newFilter);
  }
}
