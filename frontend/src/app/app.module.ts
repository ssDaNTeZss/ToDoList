import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {routes} from "./app.routing";
import {RouterModule} from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { SignupPageComponent } from './page/signup-page/signup-page.component';
import { TasksComponent } from './page/tasks/tasks.component';
import { StartPageComponent } from './page/start-page/start-page.component';
import { LoginAndSignupPageComponent } from './page/login-and-signup-page/login-and-signup-page.component';
import { AsideLeftComponent } from './aside-left/aside-left.component';
import { TableComponent } from './table/table.component';
import { AsideRightComponent } from './aside-right/aside-right.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    LoginPageComponent,
    SignupPageComponent,
    TasksComponent,
    StartPageComponent,
    LoginAndSignupPageComponent,
    AsideLeftComponent,
    TableComponent,
    AsideRightComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
