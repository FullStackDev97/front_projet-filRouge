import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OffreDetailPage } from './offre-detail.page';

describe('OffreDetailComponentPage', () => {
  let component: OffreDetailPage;
  let fixture: ComponentFixture<OffreDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OffreDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
