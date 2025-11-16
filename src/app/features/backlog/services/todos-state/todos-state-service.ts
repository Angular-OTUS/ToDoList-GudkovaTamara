import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ToDoListItem } from '../../../types/types';

@Injectable({
  providedIn: 'root',
})
export class TodosStateService {

  private readonly _isEditMode: WritableSignal<boolean> = signal(false);
  private readonly _todos: WritableSignal<ToDoListItem[]> = signal([]);

  // Public signals
  readonly todos: Signal<ToDoListItem[]> = this._todos.asReadonly();
  readonly isEditMode: Signal<boolean> = this._isEditMode.asReadonly();

  setEditingItem() {
    this._isEditMode.set(true);
  }

  setTodosList(todos: ToDoListItem[]) {
    this._todos.set(todos);
  }
}
