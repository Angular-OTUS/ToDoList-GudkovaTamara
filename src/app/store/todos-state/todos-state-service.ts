import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ToDoListItem } from '../../features/types/types';

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

  getTodoById(id: number): ToDoListItem | undefined {
    return this.todos().find(t => t.id === id);
  }

  updateSingleTodo(id: number, todo: Partial<ToDoListItem>) {
  this._todos.update(todos =>
    todos.map(t =>
      t.id === id ? { ...t, ...todo } : t
    )
  );
}
}
