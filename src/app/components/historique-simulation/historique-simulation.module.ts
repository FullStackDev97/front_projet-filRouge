import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriqueSimulationPageRoutingModule } from './historique-simulation-routing.module';

import { HistoriqueSimulationPage } from './historique-simulation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoriqueSimulationPageRoutingModule
  ],
  declarations: [HistoriqueSimulationPage]
})
export class HistoriqueSimulationPageModule {}
