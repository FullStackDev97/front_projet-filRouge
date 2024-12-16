import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NouveauteDetailPage } from './nouveaute-detail.page';

const routes: Routes = [
  {
    path: '',
    component: NouveauteDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NouveauteDetailPageRoutingModule {}
