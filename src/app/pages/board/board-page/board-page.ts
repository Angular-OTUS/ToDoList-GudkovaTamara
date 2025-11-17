import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BoardComponent } from '../../../features/board/containers/board/board';

@Component({
  selector: 'app-board-page',
  imports: [
    BoardComponent,
  ],
  templateUrl: './board-page.html',
  styleUrl: './board-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardPageComponent {

}
