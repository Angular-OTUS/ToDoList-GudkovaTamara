import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoBtn } from './add-todo-btn';

describe('AddTodoBtn', () => {
  let component: AddTodoBtn;
  let fixture: ComponentFixture<AddTodoBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodoBtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTodoBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
