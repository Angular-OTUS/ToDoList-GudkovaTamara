import { ComponentRef, OutputRefSubscription } from '@angular/core';

export interface ToastConfig {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export interface ToastModel<T> {
  ref: ComponentRef<T>;
  subscription: OutputRefSubscription;
  id: string;
  timeoutId: number | null;
}
