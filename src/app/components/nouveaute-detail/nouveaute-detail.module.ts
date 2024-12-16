import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NouveauteDetailPageRoutingModule } from './nouveaute-detail-routing.module';

import { NouveauteDetailPage } from './nouveaute-detail.page';
import { SharedModuleModule } from '../module/shared-module/shared-module.module';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NouveauteDetailPageRoutingModule,
        SharedModuleModule
    ],
  declarations: [NouveauteDetailPage],
})
export class NouveauteDetailPageModule {}
