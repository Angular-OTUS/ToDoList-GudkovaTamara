import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

import {MediaMatcher} from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { SidenavMenuComponent } from '../sidenav-menu/sidenav-menu';
import { AddTodoBtnComponent } from '../../features/todos/components/add-todo-btn/add-todo-btn';
import { LangControlComponent } from '../lang-control/lang-control';
import { TranslocoModule, TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    TranslocoPipe,

    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,

    SidenavMenuComponent,
    AddTodoBtnComponent,
    LangControlComponent,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {
 protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
