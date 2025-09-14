import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TO_DO_LIST_DATA } from './to-do-list-data';
import { ToDoListItem } from './types';
import { FormsModule } from '@angular/forms';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-to-do-list',
  imports: [
    FormsModule,
    ToDoListItemComponent,
    MatInputModule,
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListComponent {

  toDoItems: ToDoListItem[] = TO_DO_LIST_DATA;
  newToDoDescription = '';
  itemsCount = signal(this.toDoItems.length);

  deleteItem (id: number) {
    this.toDoItems = this.toDoItems.filter(item => item.id !== id);
    this.itemsCount.set(this.toDoItems.length);
  }

  addItem () {
    const currentMaxId = Math.max(
      ...this.toDoItems.map(item => item.id)
    );

    this.toDoItems.unshift({
      id: currentMaxId + 1,
      title: `Task ${currentMaxId + 1}`,
      description: this.newToDoDescription,
      completed: false
    });

    this.newToDoDescription = '';
    this.itemsCount.set(this.toDoItems.length);
  }
}
