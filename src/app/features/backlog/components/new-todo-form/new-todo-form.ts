import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ToDoListItem } from '../../../types/types';
import { AppButton } from '../../../../lib/ui/app-button/app-button';
import { TooltipDirective } from '../../../../lib/directives/tooltip/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodosDataService } from '../../services/todos-data/todos-data.service';

@Component({
  selector: 'app-new-todo-form',
  imports: [
    FormsModule,

    MatCardModule,
    MatInputModule,
    MatCheckboxModule,

    AppButton,
    TooltipDirective,
  ],
  templateUrl: './new-todo-form.html',
  styleUrl: './new-todo-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTodoFormComponent {

  private todosDataService: TodosDataService = inject(TodosDataService);

  form = viewChild<NgForm>('form');

  newTodoData: ToDoListItem = {} as ToDoListItem;

  addItem() {
    this.todosDataService.addTodo(this.newTodoData);
    this.newTodoData = {} as ToDoListItem;
    this.resetFormState();
  }

  resetFormState() {
    this.form()?.resetForm();
  }
}
