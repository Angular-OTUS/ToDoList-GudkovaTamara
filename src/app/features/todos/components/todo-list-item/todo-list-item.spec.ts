import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoListItem } from '../../../types/types';
import { ToDoListItemComponent } from './todo-list-item';

describe('ToDoListItem', () => {
  let component: ToDoListItem;
  let fixture: ComponentFixture<ToDoListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToDoListItemComponent]
    })
    .compileComponents();

    // fixture = TestBed.createComponent(ToDoListItemComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
