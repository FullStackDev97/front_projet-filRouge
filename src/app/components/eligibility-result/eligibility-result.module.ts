import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EligibilityResultPageRoutingModule } from './eligibility-result-routing.module';

import { EligibilityResultPage } from './eligibility-result.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EligibilityResultPageRoutingModule
  ],
  declarations: [EligibilityResultPage]
})
export class EligibilityResultPageModule {}
