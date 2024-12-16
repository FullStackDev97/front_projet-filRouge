import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffresImmobiliersPage } from './offresImmobiliers.page';

const routes: Routes = [
  {
    path: '',
    component: OffresImmobiliersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecommendationsPageRoutingModule {}
