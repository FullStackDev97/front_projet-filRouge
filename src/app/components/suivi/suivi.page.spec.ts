import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuiviPage } from './suivi.page';

describe('SuiviPage', () => {
  let component: SuiviPage;
  let fixture: ComponentFixture<SuiviPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
