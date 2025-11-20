import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BacklogPage } from './backlog-page';

describe('BacklogPage', () => {
  let component: BacklogPage;
  let fixture: ComponentFixture<BacklogPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BacklogPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BacklogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
