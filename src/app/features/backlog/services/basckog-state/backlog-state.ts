import { DestroyRef, effect, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'  // ← гарантирует один экземпляр
})
export class BacklogStateService {

  destroyRef = inject(DestroyRef);
  route = inject(ActivatedRoute);
  router = inject(Router);

  private readonly _selectedItemId: WritableSignal<number | null> = signal<number | null>(null);
  private readonly _isEditMode: WritableSignal<boolean> = signal(false);

  // Public signals
  readonly selectedItemId: Signal<number | null> = this._selectedItemId.asReadonly();
  readonly isEditMode: Signal<boolean> = this._isEditMode.asReadonly();

  setSelectedItemId(id: number) {
    this._selectedItemId.set(id);
  }


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

  setEditingItem() {
    this._isEditMode.set(true);
    console.log('isEditMode:', this._isEditMode());
  }

}
