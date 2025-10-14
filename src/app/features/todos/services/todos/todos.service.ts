import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { ToDoListItem } from '../../../types/types';
import { TO_DO_LIST_DATA } from './to-do-list-data';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private _todos: WritableSignal<ToDoListItem[]> = signal(TO_DO_LIST_DATA);

  countTodos = computed(() => this._todos().length);

  todos: Signal<ToDoListItem[]> = this._todos.asReadonly();

  addTodo(todo: ToDoListItem) {
    const newTodoId = this.countTodos() + 1;

    this._todos.set([
      {
        id: newTodoId,
        title: todo.title,
        description: todo.description,
        completed: false
      },
      ...this._todos(),
    ]);
  }

  deleteTodo(id: number) {
    this._todos.set(
      this._todos().filter((todo) => todo.id !== id)
    );
  }

  editTodo(todo: ToDoListItem) {
    this._todos.set(
      this._todos().map((item) => item.id === todo.id ? todo : item)
    );
  }

}
