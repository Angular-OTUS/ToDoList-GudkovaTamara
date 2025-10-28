import { ComponentRef, Directive, HostListener, input, InputSignal, signal, ViewContainerRef, WritableSignal } from '@angular/core';
import { TooltipComponent } from '../../ui/tooltip/tooltip';

@Directive({
  selector: '[appTooltip]', // Это атрибутная директива
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
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  private showTooltip() {
    if (this.tooltipComponentRef) return;
    this.tooltipComponentRef = this.viewContainerRef.createComponent(TooltipComponent);
    this.tooltipComponentRef.instance.text = this.appTooltip;
  }

  private hideTooltip() {
    if (this.tooltipComponentRef) {
      this.tooltipComponentRef.destroy();
      this.tooltipComponentRef = null;
    }
  }
}
