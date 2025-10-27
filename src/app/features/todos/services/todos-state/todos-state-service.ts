import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ToDoListItem } from '../../../types/types';

@Injectable({
  providedIn: 'root'
})
export class TodosStateService {

  private readonly _selectedItem: WritableSignal<ToDoListItem | null> = signal(null);
  private readonly _isEditMode: WritableSignal<boolean> = signal(false);
  private readonly _todos: WritableSignal<ToDoListItem[]> = signal([]);

  // Public signals
  readonly todos: Signal<ToDoListItem[]> = this._todos.asReadonly();
  readonly selectedItem: Signal<ToDoListItem | null> = this._selectedItem.asReadonly();
  readonly isEditMode: Signal<boolean> = this._isEditMode.asReadonly();

  setSelectedItem(item: ToDoListItem) {
    this._selectedItem.set(item);
    this._isEditMode.set(false);
  }

  setEditingItem(item: ToDoListItem) {
    this._selectedItem.set(item);
    this._isEditMode.set(true);
  }

  setTodosList(todos: ToDoListItem[]) {
    this._todos.set(todos);
  }
}
