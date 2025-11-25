import { computed, inject, Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@ngneat/transloco';
import { switchMap } from 'rxjs';

export function useDynamicTranslation(
  keySignal: () => string
): Signal<string> {
  const transloco = inject(TranslocoService);

  const key = computed(keySignal);
  const key$ = toObservable(key);

  return toSignal(
    key$.pipe(
      switchMap(currentKey => transloco.selectTranslate(currentKey))
    ),
  );
}
