import { DestroyRef, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BacklogStateService {

  destroyRef = inject(DestroyRef);
  route = inject(ActivatedRoute);
  router = inject(Router);

  private readonly _isEditMode: WritableSignal<boolean> = signal(false);

  // Public signals
  readonly isEditMode: Signal<boolean> = this._isEditMode.asReadonly();

  constructor() {

    this.router.events.pipe(
      takeUntilDestroyed(this.destroyRef),
      filter(event => event instanceof NavigationEnd),
      distinctUntilChanged((prev: NavigationEnd, curr: NavigationEnd) => {
        return prev.url === curr.url && prev.id === curr.id;
      })
    ).subscribe(event => {
      console.log('NavigationEnd:', event.url);
    });
  }

  setEditingItem(flag: boolean = true) {
    this._isEditMode.set(flag);
    console.log('isEditMode:', this._isEditMode());
  }

}
