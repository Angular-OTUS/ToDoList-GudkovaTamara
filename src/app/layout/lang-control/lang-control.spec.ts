import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangControlComponent } from './lang-control';

describe('LangControl', () => {
  let component: LangControlComponent;
  let fixture: ComponentFixture<LangControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LangControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LangControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
