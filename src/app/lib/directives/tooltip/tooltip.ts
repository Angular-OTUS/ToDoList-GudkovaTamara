import { ComponentRef, Directive, ElementRef, HostListener, input, InputSignal, signal, ViewContainerRef, WritableSignal } from '@angular/core';
import { TooltipComponent } from '../../ui/tooltip/tooltip';

@Directive({
  selector: '[appTooltip]', // Это атрибутная директива
  standalone: true,
})
export class TooltipDirective {

  isShown: WritableSignal<string> = signal('block');
  appTooltip: InputSignal<string> = input<string>('');

  private tooltipComponentRef: ComponentRef<TooltipComponent> | null = null;


  constructor(
    private viewContainerRef: ViewContainerRef,
    private elementRef: ElementRef,
  ) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    if (this.tooltipComponentRef) return;
    this.tooltipComponentRef = this.viewContainerRef.createComponent(TooltipComponent);
    this.tooltipComponentRef.instance.text = this.appTooltip;
    this.positionTooltip();
  }

  private hideTooltip() {
    if (this.tooltipComponentRef) {
      this.tooltipComponentRef.destroy();
      this.tooltipComponentRef = null;
    }
  }

    private positionTooltip() {
    if (!this.tooltipComponentRef) return;

    const hostElement = this.elementRef.nativeElement;
    const tooltipElement = this.tooltipComponentRef.location.nativeElement;

    const hostRect = hostElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();

    // Позиционируем над элементом
    let top = hostRect.top - tooltipRect.height - 5;
    let left = hostRect.left + (hostRect.width - tooltipRect.width) / 2;

    // Проверяем границы экрана
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Если тултип вылезает сверху - показываем снизу
    if (top < 10) {
      top = hostRect.bottom + 5;
    }

    // Если тултип вылезает слева
    if (left < 10) {
      left = 10;
    }

    // Если тултип вылезает справа
    if (left + tooltipRect.width > viewportWidth - 10) {
      left = viewportWidth - tooltipRect.width - 10;
    }

    // Если и снизу не помещается - показываем сверху, но прижимаем к верху экрана
    if (top + tooltipRect.height > viewportHeight - 10) {
      top = 10;
    }

    tooltipElement.style.position = 'fixed';
    tooltipElement.style.top = `${top}px`;
    tooltipElement.style.left = `${left}px`;
    tooltipElement.style.zIndex = '1000';
  }
}
