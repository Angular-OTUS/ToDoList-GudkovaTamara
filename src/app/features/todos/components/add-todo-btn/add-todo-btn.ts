import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogService } from '../../../../core/services/dialog/dialog';
import { NewTodoFormComponent } from '../new-todo-form/new-todo-form';

@Component({
  selector: 'app-add-todo-btn',
  imports: [
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './add-todo-btn.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTodoBtnComponent {

  dialogService = inject(DialogService);

  handleClick() {
    this.dialogService.open(NewTodoFormComponent, {
      width: '400px',
    });
  }

}
