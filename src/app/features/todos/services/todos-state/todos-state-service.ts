import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ToDoListItem } from '../../../types/types';

@Injectable({
  providedIn: 'root'
})
export class TodosStateService {

  private readonly _selectedItem: WritableSignal<ToDoListItem | null> = signal(null);
  private readonly _isEditMode: WritableSignal<boolean> = signal(false);

  readonly selectedItem: Signal<ToDoListItem | null> = this._selectedItem.asReadonly();
  readonly isEditMode: Signal<boolean> = this._isEditMode.asReadonly();

  selectItem(item: ToDoListItem) {
    this._selectedItem.set(item);
    this._isEditMode.set(false);
  }

  editItem(item: ToDoListItem) {
    this._selectedItem.set(item);
    this._isEditMode.set(true);
  }
}
