import { isDevMode } from '@angular/core';
import { TranslocoOptions } from '@ngneat/transloco';

export const TRANSLOCO_CONF: TranslocoOptions['config'] = {
  availableLangs: ['en', 'ru'],
  defaultLang: 'ru',
  fallbackLang: 'ru',
  reRenderOnLangChange: true,
  prodMode: !isDevMode(),
};
