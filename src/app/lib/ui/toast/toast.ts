import { ChangeDetectionStrategy, Component, EventEmitter, input, Input, output, Output, OutputEmitterRef } from '@angular/core';
import { MessageType, ToastPosition } from './types';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {

  messageType = input<MessageType>('info');
  message = input<string>('');
  duration = input<number>(5000);
  position = input<ToastPosition>('bottom-right');

  closeToast: OutputEmitterRef<void> = output<void>();

  getIcon(): string {
    const icons = {
      'success': '✅',
      'error': '❌',
      'warning': '⚠️',
      'info': 'ℹ️',
    };
    return icons[this.messageType()];
  }

  close(): void {
    this.closeToast.emit();
  }
}
