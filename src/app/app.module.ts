import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {WelcomePageComponent} from "./components/welcome-page/welcome-page.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {register} from "swiper/element/bundle";
import {SharedModuleModule} from "./components/module/shared-module/shared-module.module";
import {AuthInterceptor} from "./interceptor/authInterceptor/auth-interceptor";
import {AuthGuard} from "./interceptor/authGuard/auth-guard";
import {FileChooser} from "@ionic-native/file-chooser/ngx";

register();
@NgModule({
    declarations: [AppComponent, WelcomePageComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, SharedModuleModule],
    providers: [FileChooser, {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
        AuthGuard],
    bootstrap: [AppComponent],
    exports: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
