import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, OnInit, WritableSignal } from '@angular/core';
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
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

enum EStatusFilter {
  ALL = 'all',
  IN_PROGRESS = 'inProgress',
  COMPLETED = 'completed',
}

@Component({
  selector: 'app-todo-list',
  imports: [
    FormsModule,
    AsyncPipe,
    TranslocoPipe,

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
  selectedItemId = input<number>();

  todos$: Observable<ToDoListItem[]> = this.todosStateService.todos$;
  filterValueSubj = new BehaviorSubject(EStatusFilter.ALL);

  isLoading: WritableSignal<boolean> = this.todosDataService.isLoading;
  EStatusFilter = EStatusFilter;

  filteredTodos$ = combineLatest([
    this.filterValueSubj,
    this.todosStateService.todos$,
  ]).pipe(
    map(([filter, todos]: [EStatusFilter, ToDoListItem[]]) => {
      switch (filter) {
        case EStatusFilter.IN_PROGRESS:
          return todos.filter((todo) => todo.status === EStatus.IN_PROGRESS);
        case EStatusFilter.COMPLETED:
          return todos.filter((todo) => todo.status === EStatus.COMPLETED);
        default:
          return todos;
      }
    })
  )

  ngOnInit() {
    if (this.todosStateService.countTodos === 0) {
      this.todosDataService.loadTodos();
    }
  }

  onFilterChange(event: MatButtonToggleChange) {
    const newFilter = event.value;
    this.filterValueSubj.next(newFilter);
  }

}
