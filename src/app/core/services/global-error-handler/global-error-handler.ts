import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject, Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  private logger = inject(LoggerService);
  private toastService = inject(ToastService);

  handleError(error: any): void {
    if (this.isNetworkError(error)) {
      this.logger.logError('Network error', {
        message: error.message,
        online: navigator.onLine,
        url: window.location.href,
        status: error.status,
        type: 'network'
      });

      this.showNetworkErrorNotification();
      return;
    }
    const errorContext = this.createErrorContext(error);
    this.logger.logError('Unhandled error', errorContext);
    throw new Error(error);
  }

  private createErrorContext(error: any): any {
    return {
      message: error?.message || error?.toString(),
      stack: error?.stack,
      type: error?.name,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };
  }

  private isNetworkError(error: any): boolean {
    // 1. Проверяем HttpErrorResponse со статусом 0 (самый надежный признак)
    if (error instanceof HttpErrorResponse && error.status === 0) {
      return true;
    }

    // 2. Проверяем основные сетевые ошибки по сообщению
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      return message.includes('failed to fetch') ||
        message.includes('network error') ||
        message.includes('load failed');
    }

    return false;
  }

  private showNetworkErrorNotification(): void {
    this.toastService.showError('Network error', 5000);
  }
}
