import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ToDoListItem } from '../../../types/types';

@Injectable({
  providedIn: 'root',
})
export class TodosStateService {


  private readonly _todos: WritableSignal<ToDoListItem[]> = signal([]);

  // Public signals
  readonly todos: Signal<ToDoListItem[]> = this._todos.asReadonly();


  setTodosList(todos: ToDoListItem[]) {
    this._todos.set(todos);
  }
}
