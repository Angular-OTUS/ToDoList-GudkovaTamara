import { Injectable } from '@angular/core';

const ValidLevels = ['error', 'warn', 'info', 'debug', 'log'] as const;
type TValidLevel = typeof ValidLevels[number];
type t = keyof Console

@Injectable({
  providedIn: 'root',
})
export class LoggerService {

  private isProduction = false;

  logError(message: string, context?: any, stack?: string): void {
    this.log('error', message, context);
  }

  logWarn(message: string, context?: any): void {
    this.log('warn', message, context);
  }

  logInfo(message: string, context?: any): void {
    this.log('info', message, context);
  }

  logDebug(message: string, context?: any): void {
    if (!this.isProduction) {
      this.log('debug', message, context);
    }
  }

  private log(level: TValidLevel, message: string, context?: any): void {
    const logEntry = {
      level: level,
      message,
      timestamp: new Date(),
      context,
    };

    // Консоль для разработки
    if (!this.isProduction) {
    const consoleLevel = ValidLevels.includes(level)
      ? level : 'log';
      const consoleMethod = console[consoleLevel] || console.log;
      consoleMethod(`[${level.toUpperCase()}] ${message}`, context || '');
    }
  }
}
