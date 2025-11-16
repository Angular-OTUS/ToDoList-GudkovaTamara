import { TestBed } from '@angular/core/testing';
import { BacklogStateService } from './backlog-state';


describe('BacklogState', () => {
  let service: BacklogStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BacklogStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
