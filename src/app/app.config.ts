import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection, isDevMode,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './routing/app.routes';

import { materialConfigProviders } from './material/material.config';
import { GlobalErrorHandler } from './core/services/global-error-handler/global-error-handler';
import { provideHttpClient } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco/transloco-loader';
import { provideTransloco } from '@ngneat/transloco';
import { TRANSLOCO_CONF } from './transloco/transloco-conf';

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
    ), provideHttpClient(),
    provideTransloco({
      config: TRANSLOCO_CONF,
      loader: TranslocoHttpLoader
    }),
  ],
};
