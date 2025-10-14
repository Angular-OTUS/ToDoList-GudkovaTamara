import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MessageType, ToastPosition } from './types';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent {
  @Input() messageType: MessageType = 'info';
  @Input() message: string = '';
  @Input() duration: number = 5000;
  @Input() position: ToastPosition = 'bottom-right';
  @Output() closeToast  = new EventEmitter<void>();

  getIcon(): string {
    const icons = {
      'success': '✅',
      'error': '❌',
      'warning': '⚠️',
      'info': 'ℹ️'
    };
    return icons[this.messageType];
  }

  close(): void {
    this.closeToast.emit();
  }
}
