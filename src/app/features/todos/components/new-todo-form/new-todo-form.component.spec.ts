import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTodoFormComponent } from './new-todo-form.component';

describe('NewTodoFormComponent', () => {
  let component: NewTodoFormComponent;
  let fixture: ComponentFixture<NewTodoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTodoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
