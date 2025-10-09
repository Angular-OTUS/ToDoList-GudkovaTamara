import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  imports: [],
  templateUrl: './tooltip.html',
  styleUrl: './tooltip.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent {

  text: InputSignal<string> = input.required<string>();

}
