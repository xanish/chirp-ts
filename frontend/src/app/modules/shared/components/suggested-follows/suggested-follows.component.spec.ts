import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedFollowsComponent } from './suggested-follows.component';

describe('SuggestedFollowsComponent', () => {
  let component: SuggestedFollowsComponent;
  let fixture: ComponentFixture<SuggestedFollowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SuggestedFollowsComponent],
    });
    fixture = TestBed.createComponent(SuggestedFollowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
