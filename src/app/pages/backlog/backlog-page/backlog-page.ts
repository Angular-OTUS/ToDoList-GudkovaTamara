import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ToDoListComponent } from '../../../features/backlog/containers/todo-list/todo-list';

@Component({
  selector: 'app-backlog-page',
  imports: [
    ToDoListComponent,
  ],
  templateUrl: './backlog-page.html',
  styleUrl: './backlog-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BacklogPageComponent {

    selectedItemId = input.required<number, string>({
      transform: (value: string) => +value,
    });
}
