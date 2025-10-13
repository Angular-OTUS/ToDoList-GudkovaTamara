import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToDoListComponent } from './features/todos/containers/to-do-list/to-do-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToDoListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('my-app-name');
}
