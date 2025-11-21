import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodosDataService } from '../../../../api/todos-data/todos-data.service';
import { TodosStateService } from '../../../../store/todos-state/todos-state-service';
import { EStatus, ToDoListItem } from '../../../types/types';
import { ToDoListItemComponent } from '../../../todos/components/todo-list-item/todo-list-item';
import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

enum EColumnsId {
  NEW = 'new-container',
  COMPLETED = 'completed-container',
}

@Component({
  selector: 'app-board',
  imports: [
    ToDoListItemComponent,
    AsyncPipe,

    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
  ],
  templateUrl: './board.html',
  styleUrl: './board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent {

  todosDataService: TodosDataService = inject(TodosDataService);
  private todosStateService: TodosStateService = inject(TodosStateService);

  todos$: Observable<ToDoListItem[]> = this.todosStateService.todos$;

  newTodos$: Observable<ToDoListItem[]> = this.todos$.pipe(
    map((todos) => todos.filter(
      (todo) => todo?.status === EStatus.IN_PROGRESS),
    ),
  );

  completedTodos$ = this.todos$.pipe(
    map((todos) => todos.filter(
      (todo) => todo?.status === EStatus.COMPLETED),
    ),
  )

  drop(event: CdkDragDrop<ToDoListItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      const movedItem = event.previousContainer.data[event.previousIndex];

      const newStatus = event.container.id === EColumnsId.COMPLETED
        ? EStatus.COMPLETED
        : EStatus.IN_PROGRESS;

      this.todosDataService.updateTodoStatus(movedItem.id, newStatus);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  ngOnInit() {
    this.todosDataService.loadTodos();
  }
}
