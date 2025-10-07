import { ChangeDetectionStrategy, Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { ToDoListItem } from '../to-do-list/types';
import { AppButton } from '../../lib/ul/app-button/app-button';
import { MatCardModule } from '@angular/material/card';
import { TooltipDirective } from '../../lib/directives/tooltip/tooltip';

@Component({
  selector: 'to-do-list-item',
  imports: [
    AppButton,
    MatCardModule,
    TooltipDirective,
  ],
  templateUrl: './to-do-list-item.html',
  styleUrl: './to-do-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoListItemComponent {

  item: InputSignal<ToDoListItem> = input.required<ToDoListItem>();
  isSelected: InputSignal<boolean> = input<boolean>(false);
  deleted: OutputEmitterRef<ToDoListItem['id']> = output<ToDoListItem['id']>();
  selected: OutputEmitterRef<ToDoListItem> = output<ToDoListItem>();

  deleteItem (id: number) {
    this.deleted.emit(id);
  }

  selectItem (item: ToDoListItem) {
    this.selected.emit(item);
  }
}
