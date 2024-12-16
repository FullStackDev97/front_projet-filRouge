import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoriqueSimulationPage } from './historique-simulation.page';

describe('HistoriqueSimulationPage', () => {
  let component: HistoriqueSimulationPage;
  let fixture: ComponentFixture<HistoriqueSimulationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriqueSimulationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
