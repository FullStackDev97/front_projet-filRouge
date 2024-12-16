import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OffresImmobiliersPage } from './offresImmobiliers.page';

describe('RecommendationsPage', () => {
  let component: OffresImmobiliersPage;
  let fixture: ComponentFixture<OffresImmobiliersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OffresImmobiliersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
