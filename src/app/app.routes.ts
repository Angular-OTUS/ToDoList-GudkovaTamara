import { Routes } from '@angular/router';
import { ToDoListComponent } from './features/todos/containers/todo-list/todo-list';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: ToDoListComponent,
  },
    {
    path: 'tasks/:selectedItemId',
    component: ToDoListComponent,
  },
  {
    path: '**',
    redirectTo: 'tasks',
  }
];
