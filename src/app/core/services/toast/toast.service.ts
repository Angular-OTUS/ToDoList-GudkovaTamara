import { ComponentRef, createComponent, EnvironmentInjector, inject, Injectable, OnDestroy } from '@angular/core';
import { ToastComponent } from '../../../lib/ul/toast/toast';
import { ToastConfig, ToastModel } from './types';
import { Subscription } from 'rxjs';

// Дефолтные настройки
const DEFAULT_TOAST_CONFIG: Required<Omit<ToastConfig, 'message'>> = {
  type: 'info',
  duration: 5000,
  position: 'bottom-right'
};

@Injectable({ providedIn: 'root' })
export class ToastService implements OnDestroy {
  private environmentInjector: EnvironmentInjector = inject(EnvironmentInjector);

  private toasts: ToastModel<ToastComponent>[] = [];
  private readonly MAX_TOASTS = 5; // Максимум тостов одновременно

  ngOnDestroy(): void {
    this.destroyAll(); // очистит DOM и таймеры
  }

  private removeOldestIfNeeded(): void {
    // Автоматически удаляем старые тосты при превышении лимита
    if (this.toasts.length > this.MAX_TOASTS) {
      const oldestToast = this.toasts.shift(); // Удаляем самый старый
      oldestToast?.ref?.destroy();
    }
  }

  show(config: ToastConfig): void {
    const toastId = `toast-${Date.now()}`;

    // Автоматически применяем лимит
    this.removeOldestIfNeeded();

    // Создаем нормализованный конфиг с дефолтными значениями
    const finalConfig = { ...DEFAULT_TOAST_CONFIG, ...config };

    const toastRef = this.createToastComponent(finalConfig);
    this.setupToastBehavior(toastRef, toastId, finalConfig);
  }

  private createToastComponent(config: Required<ToastConfig>): ComponentRef<ToastComponent> {
    const toastRef = createComponent(ToastComponent, {
      environmentInjector: this.environmentInjector
    });

    toastRef.setInput('message', config.message);
    toastRef.setInput('messageType', config.type);
    toastRef.setInput('position', config.position);

    document.body.appendChild(toastRef.location.nativeElement);
    toastRef.changeDetectorRef.detectChanges();

    return toastRef;
  }

  private setupToastBehavior(
    toastRef: ComponentRef<ToastComponent>,
    toastId: string,
    finalConfig: Required<ToastConfig>
  ): void {
    const closeSubscription = this.setupCloseSubscription(toastRef, toastId);
    const timeoutId = this.setupAutoClose(toastId, finalConfig.duration);
    this.setupCleanupOnDestroy(toastRef, toastId);
    this.registerToast(
      toastRef,
      toastId,
      { subscription: closeSubscription, timeoutId }
    );
  }

  // Внутренний метод для удаления
  private destroyToast(id: string): void {
    const toastEntry = this.toasts.find(toast => toast.id === id);

    if (!toastEntry) {
      return;
    }

    // Удаляем из DOM
    const nativeElement = toastEntry.ref.location.nativeElement;
    if (nativeElement.parentNode) {
      nativeElement.parentNode.removeChild(nativeElement);
    }

    // Уничтожаем компонент (это вызовет onDestroy)
    toastEntry.ref.destroy();
    toastEntry.subscription.unsubscribe();

    // Очищаем таймер
    if (toastEntry.timeoutId) {
      clearTimeout(toastEntry.timeoutId);
    }
    // Удаляем из массива
    this.toasts = this.toasts.filter(toast => toast.id !== id);
  }

  private setupCloseSubscription(toastRef: ComponentRef<ToastComponent>, toastId: string): Subscription {
    return toastRef.instance.closeToast.subscribe(() => {
      this.destroyToast(toastId);
    });
  }

  private setupAutoClose(toastId: string, duration: number): number | null {
    let timeoutId: number | null = null;
    if (duration > 0) {
      timeoutId = setTimeout(() => {
        this.destroyToast(toastId);
      }, duration);
    }
    return timeoutId;
  }

  private setupCleanupOnDestroy(toastRef: ComponentRef<ToastComponent>, toastId: string) {
    toastRef.onDestroy(() => {
      this.destroyToast(toastId);
    });
  }

  private registerToast(
    toastRef: ComponentRef<ToastComponent>,
    toastId: string,
    behavior: { subscription: any; timeoutId: number | null }
  ) {
    this.toasts.push({
      ref: toastRef,
      subscription: behavior.subscription,
      id: toastId,
      timeoutId: behavior.timeoutId
    });
  }

  // Публичные методы для ручного управления
  public hide(toastId: string): void {
    this.toasts.find(toast => toast.id === toastId)?.ref?.destroy();
  }

  public destroyAll(): void {
    this.toasts.forEach(toast => this.destroyToast(toast.id));
    this.toasts = [];
  }

  public showSuccess(message: string, duration?: number): void {
    this.show({
      message,
      type: 'success',
      duration
    });
  }

  public showError(message: string, duration?: number): void {
    this.show({
      message,
      type: 'error',
      duration
    });
  }

  public showWarning(message: string, duration?: number): void {
    this.show({
      message,
      type: 'warning',
      duration
    });
  }

  public showInfo(message: string, duration?: number): void {
    this.show({
      message,
      type: 'info',
      duration
    });
  }
}
