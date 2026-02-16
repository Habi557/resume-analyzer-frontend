import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { TestComponent } from './components/test/test.component';
import { ShowAllResumesComponent } from './components/show-all-resumes/show-all-resumes.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminGuard } from './guards/admin.guard';
import { Oauth2SucessComponent } from './components/oauth2-sucess/oauth2-sucess.component';
import { Oauth2FailureComponent } from './components/oauth2-failure/oauth2-failure.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component:LoginComponent },
  { path: 'dashboard', component:DashboardComponent,canActivate:[AuthGuard,AdminGuard] },
  { path: 'userdashboard', component:UserdashboardComponent,canActivate:[AuthGuard] },
  {path: 'show-resumes',component:ShowAllResumesComponent,canActivate:[AuthGuard]},
  {path: 'signupForm', component:SignupComponent},
  {path: 'oauth-success', component: Oauth2SucessComponent,data: { noLayout: true }},
  {path: 'oauth-failure', component: Oauth2FailureComponent},
  {path: 'profile',component:ProfileComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
