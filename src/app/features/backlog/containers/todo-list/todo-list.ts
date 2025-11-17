import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { EStatus, ToDoListItem } from '../../../types/types';
import { FormsModule } from '@angular/forms';
import { ToDoListItemComponent } from '../../components/todo-list-item/todo-list-item';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditTodoFormComponent } from '../../components/edit-todo-form/edit-todo-form';
import { TodosStateService } from '../../services/todos-state/todos-state-service';
import { NewTodoFormComponent } from '../../components/new-todo-form/new-todo-form';
import { SpinnerComponent } from '../../../../lib/ui/spinner/spinner';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { TodosDataService } from '../../services/todos-data/todos-data.service';
import { BacklogStateService } from '../../services/basckog-state/backlog-state';
import { ActivatedRoute } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

    EditTodoFormComponent,
    NewTodoFormComponent,
    SpinnerComponent,
  ],
  providers: [
    BacklogStateService,
  ],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListComponent implements OnInit {

  // private route = inject(ActivatedRoute); // Это правильный ActivatedRoute

  private todosDataService: TodosDataService = inject(TodosDataService);
  private todosStateService: TodosStateService = inject(TodosStateService);
  private backlogStateService = inject(BacklogStateService);

  destroyRef = inject(DestroyRef);

  // Порядок generic параметров для input:
  // Первый параметр: Выходной тип
  // Второй параметр: Входной тип
  selectedItemId = this.backlogStateService.selectedItemId;

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

  // Обработчик изменения фильтра
  onFilterChange(event: MatButtonToggleChange) {
    const newFilter = event.value;
    this.filterValue.set(newFilter);
  }
}
