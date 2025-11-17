import { Routes } from '@angular/router';
import { ERoute } from './types';
import { BacklogPageComponent } from '../pages/backlog/backlog-page/backlog-page';
import { BacklogStateService } from '../features/backlog/services/basckog-state/backlog-state';

export const routes: Routes = [

  {
    path: '',
    redirectTo: ERoute.BACKLOG,
    pathMatch: 'full',
  },
  {
    path: ERoute.BOARD,
    loadComponent: () => import('../pages/board/board-page/board-page')
      .then(m => m.BoardPageComponent),
  },
  {
    path: ERoute.BACKLOG,
    loadComponent: () => import('../pages/backlog/backlog-page/backlog-page')
      .then(m => m.BacklogPageComponent),
  },
  {
    path: `${ERoute.BACKLOG}/:selectedItemId`,
    loadComponent: () => import('../pages/backlog/backlog-page/backlog-page')
      .then(m => m.BacklogPageComponent),
  },

  {
    path: '**',
    redirectTo: 'tasks',
  },
];
