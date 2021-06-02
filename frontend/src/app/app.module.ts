import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { routes } from "./app.routing";
import { AsideLeftComponent } from "./aside-left/aside-left.component";
import { AsideRightComponent } from "./aside-right/aside-right.component";
import { BannerComponent } from "./banner/banner.component";
import { HeaderComponent } from "./header/header.component";
import { LoginAndSignupPageComponent } from "./page/login-and-signup-page/login-and-signup-page.component";
import { LoginPageComponent } from "./page/login-page/login-page.component";
import { SignupPageComponent } from "./page/signup-page/signup-page.component";
import { StartPageComponent } from "./page/start-page/start-page.component";
import { TasksComponent } from "./page/tasks/tasks.component";
import { DateConvertPipe } from "./pipes/date-convert.pipe";
import { PopupComponent } from "./popup/popup.component";
import { TableComponent } from "./table/table.component";
import { WebReqInterceptor } from "./web-req.interceptor";


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
    AsideRightComponent,
    PopupComponent,
    DateConvertPipe,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
