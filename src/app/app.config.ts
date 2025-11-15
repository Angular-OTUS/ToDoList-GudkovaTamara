import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';

import { materialConfigProviders } from './material/material.config';
import { GlobalErrorHandler } from './core/services/global-error-handler/global-error-handler';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),

    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    ...materialConfigProviders,

    provideRouter(
      routes,
      withViewTransitions(),
      withComponentInputBinding(),
    ),
  ],
};
