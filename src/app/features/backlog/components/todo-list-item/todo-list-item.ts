import { ChangeDetectionStrategy, Component, inject, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { EStatus, ToDoListItem } from '../../../types/types';
import { MatCardModule } from '@angular/material/card';
import { TooltipDirective } from '../../../../lib/directives/tooltip/tooltip';
import { TodosStateService } from '../../services/todos-state/todos-state-service';
import { ToastService } from '../../../../core/services/toast/toast.service';
import { TodosDataService } from '../../services/todos-data/todos-data.service';
import { MatIconModule } from '@angular/material/icon';
import { AppButton } from '../../../../lib/ui/app-button/app-button';
import { Router } from '@angular/router';
import { ERoute } from '../../../../routing/types';
import { BacklogStateService } from '../../services/basckog-state/backlog-state';

@Component({
  selector: 'todo-list-item',
  imports: [
    AppButton,
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
  deleted: OutputEmitterRef<ToDoListItem['id']> = output<ToDoListItem['id']>();
  Status = EStatus
  ERoute = ERoute;

  readonly statusIconsMap = new Map([
    [EStatus.COMPLETED, '✔️'],
    [EStatus.IN_PROGRESS, '⏰'],
  ])

  selectItem(evt: Event) {
    console.log('selectItem');
    setTimeout(() => {
      this.router.navigate([ERoute.BACKLOG, this.item().id]);
    }, 0);
  }

  handleDblClick(evt: Event) {
    console.log('handleDblClick');
    this.backlogStateService.setEditingItem();
  }

  deleteItem(id: number) {
    this.todosDataService.deleteTodo(id);
  }

  ngOnChanges() {
    console.log('🎯 ngOnChanges - component rerendering');
  }

}
