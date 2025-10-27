import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-new-todo-form.component',
  imports: [],
  templateUrl: './new-todo-form.component.html',
  styleUrl: './new-todo-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTodoFormComponent {

}
