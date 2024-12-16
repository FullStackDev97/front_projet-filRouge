import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavorisPageRoutingModule } from './favoris-routing.module';

import { FavorisPage } from './favoris.page';
import {SharedModuleModule} from "../module/shared-module/shared-module.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FavorisPageRoutingModule,
        SharedModuleModule
    ],
  declarations: [FavorisPage]
})
export class FavorisPageModule {}
