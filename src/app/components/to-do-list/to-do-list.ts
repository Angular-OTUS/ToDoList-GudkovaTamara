import { ChangeDetectionStrategy, Component, OnInit, signal, WritableSignal } from '@angular/core';
import { TO_DO_LIST_DATA } from './to-do-list-data';
import { ToDoListItem } from './types';
import { FormsModule } from '@angular/forms';
import { ToDoListItemComponent } from '../to-do-list-item/to-do-list-item';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppButton } from '../../lib/ul/app-button/app-button';
import { MatCardModule } from '@angular/material/card';
import { TooltipDirective } from '../../lib/directives/tooltip/tooltip';

@Component({
  selector: 'app-to-do-list',
  imports: [
    FormsModule,
    ToDoListItemComponent,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,

    TooltipDirective,
    AppButton
  ],
  templateUrl: './to-do-list.html',
  styleUrl: './to-do-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListComponent implements OnInit {

  toDoItems: ToDoListItem[] = TO_DO_LIST_DATA;
  newTodoData = {} as ToDoListItem;

  itemsCount = signal(this.toDoItems.length);
  isLoading: WritableSignal<boolean> = signal(true);
  selectedItem: WritableSignal<ToDoListItem | null> = signal(null);

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
      title: this.newTodoData.title ? this.newTodoData.title : `Task ${currentMaxId + 1}`,
      description: this.newTodoData.description,
      completed: false
    });

    this.newTodoData = {} as ToDoListItem
    this.itemsCount.set(this.toDoItems.length);
  }

  showSelectedItemContent($event: ToDoListItem): void {
    this.selectedItem.set($event);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }
}
