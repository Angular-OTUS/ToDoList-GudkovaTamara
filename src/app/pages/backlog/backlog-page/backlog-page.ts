import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ToDoListComponent } from '../../../features/backlog/containers/todo-list/todo-list';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { EditTodoFormComponent } from '../../../features/backlog/components/edit-todo-form/edit-todo-form';

@Component({
  selector: 'app-backlog-page',
  imports: [
    ToDoListComponent,
    EditTodoFormComponent,

    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
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
