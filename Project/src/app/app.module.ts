import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService} from './services/auth.service';
import { HomepageComponent } from './homepage/homepage.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthGuardService } from './services/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserhomeComponent,
    HomepageComponent,
  ],
  imports: [
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
