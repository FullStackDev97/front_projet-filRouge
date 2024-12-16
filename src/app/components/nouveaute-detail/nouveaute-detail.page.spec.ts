import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NouveauteDetailPage } from './nouveaute-detail.page';

describe('NouveauteDetailPage', () => {
  let component: NouveauteDetailPage;
  let fixture: ComponentFixture<NouveauteDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauteDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
