import { ComponentRef, OutputRefSubscription } from '@angular/core';
import { Subscription } from 'rxjs';

export type ToastConfig = {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export type ToastModel<T> = {
  ref: ComponentRef<T>;
  subscription: OutputRefSubscription;
  id: string;
  timeoutId: number | null;
}
