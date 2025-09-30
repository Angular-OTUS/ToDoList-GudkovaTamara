import { ChangeDetectionStrategy, Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { ToDoListItem } from '../to-do-list/types';
import { AppButton } from '../../lib/ul/app-button/app-button';

@Component({
  selector: 'to-do-list-item',
  imports: [
    AppButton
  ],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListItemComponent {

  item: InputSignal<ToDoListItem> = input.required<ToDoListItem>();
  deleted: OutputEmitterRef<ToDoListItem['id']> = output<ToDoListItem['id']>();

  deleteItem (id: number) {
    this.deleted.emit(id);
  }
}
