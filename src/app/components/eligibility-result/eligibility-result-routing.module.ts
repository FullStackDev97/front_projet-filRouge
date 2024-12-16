import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EligibilityResultPage } from './eligibility-result.page';

const routes: Routes = [
  {
    path: '',
    component: EligibilityResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EligibilityResultPageRoutingModule {}
