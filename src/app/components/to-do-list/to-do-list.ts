import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { TO_DO_LIST_DATA } from './to-do-list-data';
import { ToDoListItem } from './types';
import { FormsModule } from '@angular/forms';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { AppButton } from '../../lib/ul/app-button/app-button';

@Component({
  selector: 'app-to-do-list',
  imports: [
    FormsModule,
    ToDoListItemComponent,
    MatInputModule,
    MatProgressSpinnerModule,
    AppButton
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListComponent implements OnInit {

  toDoItems: ToDoListItem[] = TO_DO_LIST_DATA;
  newToDoDescription = '';
  itemsCount = signal(this.toDoItems.length);
  isLoading: WritableSignal<boolean> = signal(true);

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

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }
}
