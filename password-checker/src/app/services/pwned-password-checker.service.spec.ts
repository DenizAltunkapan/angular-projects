import { TestBed } from '@angular/core/testing';

import { PwnedPasswordCheckerService } from './pwned-password-checker.service';

describe('PwnedPasswordCheckerService', () => {
  let service: PwnedPasswordCheckerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PwnedPasswordCheckerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
