import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout';

@Component({
  selector: 'app-root',
  imports: [
    // RouterOutlet,
    MainLayoutComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('my-app-name');
}
