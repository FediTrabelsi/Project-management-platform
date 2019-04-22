import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService} from './services/auth.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthGuardService } from './services/auth-guard.service';
import { MyProjectsComponent } from './my-projects/my-projects.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ViewProfilesComponent } from './view-profiles/view-profiles.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PushNotificationsModule } from 'ng-push';


@NgModule({
  declarations: [

    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserhomeComponent,
    MyProjectsComponent,
    ProjectEditComponent,
    WelcomePageComponent,
    ViewProfilesComponent,
    NavbarComponent,

  ],
  imports: [
    PushNotificationsModule,
    FormsModule,
    MDBBootstrapModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    AuthService,
    AuthGuardService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
