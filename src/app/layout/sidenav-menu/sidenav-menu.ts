import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNavList } from '@angular/material/list';

@Component({
  selector: 'app-sidenav-menu',
  imports: [
    MatNavList,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './sidenav-menu.html',
  styleUrl: './sidenav-menu.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavMenuComponent {

}
