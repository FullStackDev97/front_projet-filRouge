import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {FooterComponent} from "../../footer/footer.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [FooterComponent],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ],
  exports: [FooterComponent]
})
export class SharedModuleModule { }
