import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangControl } from './lang-control';

describe('LangControl', () => {
  let component: LangControl;
  let fixture: ComponentFixture<LangControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LangControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LangControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
