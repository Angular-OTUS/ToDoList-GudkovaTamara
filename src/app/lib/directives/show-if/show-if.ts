import { Directive, Input, OnChanges, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appShowIf]'
})
export class ShowIfDirective implements OnChanges {

  @Input() appShowIf!: boolean;

  private hasView = false;

  constructor(
    private templateRef: TemplateRef<HTMLElement>,
    private viewContainerRef: ViewContainerRef,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if ('appShowIf' in changes) {
      if (this.appShowIf && !this.hasView) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (!this.appShowIf && this.hasView) {
        this.viewContainerRef.clear();
        this.hasView = false;
      }

    }
  }
}
