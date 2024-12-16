import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoriqueSimulationPage } from './historique-simulation.page';

const routes: Routes = [
  {
    path: '',
    component: HistoriqueSimulationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoriqueSimulationPageRoutingModule {}
