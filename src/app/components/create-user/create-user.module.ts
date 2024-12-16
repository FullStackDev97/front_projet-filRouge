import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateUserPageRoutingModule } from './create-user-routing.module';
import { CreateUserPage } from './create-user.page';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: CreateUserPage
  }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreateUserPageRoutingModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
  declarations: [CreateUserPage]
})
export class CreateUserPageModule {}
