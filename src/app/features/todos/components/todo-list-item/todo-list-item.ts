import { ChangeDetectionStrategy, Component, inject, input, InputSignal } from '@angular/core';
import { EStatus, ToDoListItem } from '../../../types/types';
import { MatCardModule } from '@angular/material/card';
import { TooltipDirective } from '../../../../lib/directives/tooltip/tooltip';
import { TodosDataService } from '../../../../api/todos-data/todos-data.service';
import { MatIconModule } from '@angular/material/icon';
import { AppButton } from '../../../../lib/ui/app-button/app-button';
import { Router } from '@angular/router';
import { ERoute } from '../../../../routing/types';
import { BacklogStateService } from '../../../backlog/services/basckog-state/backlog-state';

@Component({
  selector: 'todo-list-item',
  imports: [
    AppButton,
    TooltipDirective,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './todo-list-item.html',
  styleUrl: './todo-list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToDoListItemComponent {

  private backlogStateService = inject(BacklogStateService);
  private todosDataService = inject(TodosDataService);

  private router = inject(Router);

  item: InputSignal<ToDoListItem> = input.required<ToDoListItem>();
  isSelected: InputSignal<boolean> = input<boolean>(false);
  Status = EStatus
  ERoute = ERoute;

  readonly statusIconsMap = new Map([
    [EStatus.COMPLETED, '✔️'],
    [EStatus.IN_PROGRESS, '⏰'],
  ])

  selectItem(evt: Event) {
    this.backlogStateService.setEditingItem(false);
    setTimeout(() => {
      this.router.navigate([ERoute.BACKLOG, this.item().id]);
    }, 0);
  }

  handleDblClick(evt: Event) {
    this.backlogStateService.setEditingItem();
  }

  deleteItem(id: number) {
    this.todosDataService.deleteTodo(id);
  }

  ngOnChanges() {
    console.log('🎯 ngOnChanges - component rerendering');
  }

}
