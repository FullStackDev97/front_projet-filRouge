import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffreDetailPage } from './offre-detail.page';

const routes: Routes = [
  {
    path: '',
    component: OffreDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffreDetailComponentPageRoutingModule {}
