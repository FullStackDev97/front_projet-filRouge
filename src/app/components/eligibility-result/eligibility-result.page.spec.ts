import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EligibilityResultPage } from './eligibility-result.page';

describe('EligibilityResultPage', () => {
  let component: EligibilityResultPage;
  let fixture: ComponentFixture<EligibilityResultPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EligibilityResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
