import { ComponentRef, Directive, HostListener, input, InputSignal, signal, ViewContainerRef, WritableSignal } from '@angular/core';
import { TooltipComponent } from '../../ul/tooltip/tooltip';

@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {

  isShown: WritableSignal<string> = signal('block');
  appTooltip: InputSignal<string> = input<string>('');

  private tooltipComponentRef: ComponentRef<TooltipComponent> | null = null;

  constructor(
    private viewContainerRef: ViewContainerRef
  ) { }

  @HostListener('mouseenter') onMouseEnter() {
    console.log('onMouseEnter');
    // СТРУКТУРНОЕ ИЗМЕНЕНИЕ: Создаем компонент подсказки
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    // СТРУКТУРНОЕ ИЗМЕНЕНИЕ: Уничтожаем компонент подсказки
    this.hideTooltip();
  }

  private showTooltip() {
    if (this.tooltipComponentRef) return;
    this.tooltipComponentRef = this.viewContainerRef.createComponent(TooltipComponent);
    this.tooltipComponentRef.instance.text = this.appTooltip;
  }

  private hideTooltip() {
    if (this.tooltipComponentRef) {
      // Метод destroy() СТРУКТУРНО меняет DOM
      this.tooltipComponentRef.destroy();
      this.tooltipComponentRef = null;
    }
  }
}
