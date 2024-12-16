import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecommendationsPageRoutingModule } from './recommendations-routing.module';

import { OffresImmobiliersPage } from './offresImmobiliers.page';
import {SharedModuleModule} from "../module/shared-module/shared-module.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecommendationsPageRoutingModule,
    SharedModuleModule
  ],
  declarations: [OffresImmobiliersPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecommendationsPageModule {}
