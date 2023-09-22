import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { tweetResolver } from './tweet.resolver';

describe('tweetResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => tweetResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
