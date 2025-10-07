import { ChangeDetectionStrategy, Component, input, InputSignal, output } from '@angular/core';
import { MatButtonAppearance, MatButtonModule } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-button',
  imports: [
    MatButtonModule,
  ],
  templateUrl: './app-button.html',
  styleUrl: './app-button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppButton {

  title: InputSignal<string> = input.required<string>();
  isDisabled: InputSignal<boolean> = input<boolean>(false);
  type: InputSignal<string> = input<string>('button');
  appearance: InputSignal<MatButtonAppearance> = input<MatButtonAppearance>('filled');
  // параметр для управления остановкой распространения
  stopPropagation: InputSignal<boolean> = input<boolean>(false);

  clicked = output<void>();

  handleClick(evt: Event) {

    if (this.stopPropagation()) {
      evt.stopPropagation();
    }
    this.clicked.emit();
  }
}
