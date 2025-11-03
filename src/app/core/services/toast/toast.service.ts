import { ComponentRef, createComponent, EnvironmentInjector, inject, Injectable, OnDestroy, OutputRefSubscription } from '@angular/core';
import { ToastConfig, ToastModel } from './types';
import { ToastComponent } from '../../../lib/ui/toast/toast';

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
      if (oldestToast?.id) {
        this.destroyToast(oldestToast.id);
      } else {
        console.error('Не удалось удалить старый тост');
      }

      oldestToast?.ref?.destroy();
    }
  }

  show(config: ToastConfig): void {
    const toastId = `toast-${Date.now()}`;

    // Автоматически применяем лимит
    this.removeOldestIfNeeded();

    // Создаем нормализованный конфиг с дефолтными значениями
    const finalConfig = this.getFinalConfig(config);

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

  private setupCloseSubscription(toastRef: ComponentRef<ToastComponent>, toastId: string): OutputRefSubscription {
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
    behavior: { subscription: OutputRefSubscription; timeoutId: number | null }
  ) {
    this.toasts.push({
      ref: toastRef,
      subscription: behavior.subscription,
      id: toastId,
      timeoutId: behavior.timeoutId
    });
  }

  getFinalConfig (config: ToastConfig): Required<ToastConfig> {
    return {
      message: config.message,
      type: config.type ?? DEFAULT_TOAST_CONFIG.type,
      duration: config.duration ?? DEFAULT_TOAST_CONFIG.duration,
      position: config.position ?? DEFAULT_TOAST_CONFIG.position,
    };
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
