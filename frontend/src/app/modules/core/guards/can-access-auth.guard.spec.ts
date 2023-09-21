import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canAccessAuthGuard } from './can-access-auth.guard';

describe('canAccessAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => canAccessAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
