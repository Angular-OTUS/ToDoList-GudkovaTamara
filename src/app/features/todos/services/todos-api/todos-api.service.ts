import { inject, Injectable } from '@angular/core';
import { ApiBaseService } from '../../../../core/api/api-base.service';
import { Observable } from 'rxjs';
import { ToDoListItem } from '../../../types/types';

@Injectable({
  providedIn: 'root'
})
export class TodosApiService {

  apiBaseService = inject(ApiBaseService);

  getTodos(): Observable<ToDoListItem[]> {
    return this.apiBaseService.get<ToDoListItem[]>('todos');
  }

  createTodo(todo: ToDoListItem): Observable<ToDoListItem> {
    return this.apiBaseService.post<ToDoListItem>('todos', todo);
  }

  deleteTodo(id: number): Observable<void> {
    return this.apiBaseService.delete<void>(`todos/${id}`);
  }

  updateTodo(todo: Partial<ToDoListItem>): Observable<Partial<ToDoListItem>> {
    return this.apiBaseService.patch<Partial<ToDoListItem>>(`todos/${todo.id}`, todo);
  }

}
