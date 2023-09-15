import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { editProfileGuard } from './edit-profile.guard';

describe('editProfileGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => editProfileGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
