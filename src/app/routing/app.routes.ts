import { Routes } from '@angular/router';
import { ERoute } from './types';
import { BacklogPageComponent } from '../pages/backlog/backlog-page/backlog-page';
import { ToDoListComponent } from '../features/backlog/containers/todo-list/todo-list';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: ERoute.BOARD,
    component: ToDoListComponent,
  },
  {
    path: ERoute.BACKLOG,
    component: BacklogPageComponent, // ToDoListComponent,
  },
  {
    path: `${ERoute.BACKLOG}/:selectedItemId`,
    component: BacklogPageComponent,
  },
  {
    path: '**',
    redirectTo: 'tasks',
  },
];
