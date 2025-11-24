import { Injectable } from '@angular/core';
import { ToDoListItem } from '../../features/types/types';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosStateService {

  private readonly _todosSubject = new BehaviorSubject<ToDoListItem[]>([]);

  readonly todos$: Observable<ToDoListItem[]> = this._todosSubject.asObservable();

  get countTodos (): number {
    return this._todosSubject.getValue().length;
  }

  setTodosList(todos: ToDoListItem[]) {
    this._todosSubject.next(todos);
  }

  getTodoById(id: number): ToDoListItem | undefined {
    return this._todosSubject.getValue().find(t => t.id === id);
  }

  updateSingleTodo(id: number, todo: Partial<ToDoListItem>) {
    const newTodos =
      this._todosSubject.getValue().map(t =>
        t.id === id ? { ...t, ...todo } : t
      );

    this._todosSubject.next(newTodos);
  }
}
