import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MyProjectsComponent} from './my-projects/my-projects.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';

const routes: Routes = [
  {path: '', redirectTo: 'login',pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'userhome', component: UserhomeComponent, canActivate: [AuthGuardService]},
  {path: 'myprojects', component: MyProjectsComponent, canActivate: [AuthGuardService]},
  {path : 'editproject', component: ProjectEditComponent, canActivate: [AuthGuardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  bootstrap: [],
})
export class AppRoutingModule { }
