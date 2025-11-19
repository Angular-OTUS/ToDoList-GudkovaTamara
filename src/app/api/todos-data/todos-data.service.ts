import { computed, DestroyRef, inject, Injectable, Injector, Signal, signal, WritableSignal } from '@angular/core';
import { EStatus, ToDoListItem } from '../../features/types/types';
import { TodosApiService } from '../todos-api/todos-api.service';
import { catchError, EMPTY, map, of, tap } from 'rxjs';
import { ToastService } from '../../core/services/toast/toast.service';
import { LoggerService } from '../../core/services/logger/logger.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TodosStateService } from '../../store/todos-state/todos-state-service';

@Injectable({
  providedIn: 'root',
})
export class TodosDataService {

  todosApiService = inject(TodosApiService);
  toastService = inject(ToastService);
  loggerService = inject(LoggerService);
  stateService = inject(TodosStateService);
  private destroyRef = inject(DestroyRef);

  countTodos = computed(() => this.stateService.todos().length);
  isLoading: WritableSignal<boolean> = signal(false);
  selectedItemId: WritableSignal<number | null> = signal(null);

  addTodo(todo: ToDoListItem) {
    const newTodoId = this.countTodos() + 1;
    this.todosApiService.createTodo({
      ...todo,
      title: todo.title ?? this.getDefaultTitle(newTodoId.toString()),
      status: EStatus.IN_PROGRESS,
      id: newTodoId,
    }).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((updatedItem) => {
        this.loadTodos();
        this.toastService.showSuccess(`Задача "${updatedItem.title}" успешно добавлена`);
      }),
      catchError(e => {
        console.error(e.message, e.stack, e.status);
        this.toastService.showError('Ошибка добавления задачи');
        return of([]);
      }),
    ).subscribe();
  }

  deleteTodo(id: number) {
    this.todosApiService.deleteTodo(id).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(() => {
        this.toastService.showSuccess('Задача успешно удалена');
        this.loadTodos();
      }),
      catchError(e => {
        console.error(e.message, e.stack, e.status);
        this.toastService.showError('Ошибка удаления задачи');
        return of([]);
      }),
    ).subscribe();
  }

  editTodo(todo: ToDoListItem) {
    this.todosApiService.updateTodo({
      ...todo,
      title: todo.title ?? this.getDefaultTitle(todo.id.toString()),
    }).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap(() => {
        this.toastService.showSuccess('Задача успешно обновлена');
        this.loadTodos();
      }),
      catchError(e => {
        console.error(e.message, e.stack, e.status);
        this.toastService.showError('Ошибка обновления задачи');
        return of([]);
      }),
    ).subscribe();
  }

  loadTodos(): void {
    this.isLoading.set(true);
    this.todosApiService.getTodos()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map(todos => todos.sort((a, b) => b.id - a.id)),
        tap(todos => {
          this.stateService.setTodosList(todos);
          this.isLoading.set(false);
        }),
        catchError(e => {
          this.toastService.showError(e.message);
          return of([]);
        }),
      ).subscribe();
  }

  getDefaultTitle(id: string): string {
    return `Task ${id}`;
  }

  updateTodoStatus(id: number, status: EStatus) {
    const originalTodo = this.stateService.getTodoById(id);

    if (!originalTodo) {
      console.error(`Todo with id ${id} not found`);
      return;
    }

    this.todosApiService.updateTodo({ id, status }).pipe(
      takeUntilDestroyed(this.destroyRef),
      tap((updatedTodo) => {
        this.toastService.showSuccess('Статус задачи успешно обновлен');
        this.stateService.updateSingleTodo(id, updatedTodo);
      }),
      catchError(e => {
        console.error(e.message, e.stack, e.status);
        this.toastService.showError('Ошибка обновления статуса задачи');
        // отправляем в стор, чтобы список тутудек реактивно обновился и тудушка вернулась в нужную колонку
        this.stateService.updateSingleTodo(id, { status: originalTodo.status });
        return EMPTY;
      }),
    ).subscribe();
  }

  clearTodosState () {
    this.stateService.setTodosList([]);
  }
}
