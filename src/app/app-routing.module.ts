import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { UserdashboardComponent } from './components/userdashboard/userdashboard.component';
import { TestComponent } from './components/test/test.component';
import { ShowAllResumesComponent } from './components/show-all-resumes/show-all-resumes.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component:LoginComponent },
  { path: 'dashboard', component:DashboardComponent,canActivate:[AuthGuard] },
  { path: 'userdashboard', component:UserdashboardComponent,canActivate:[AuthGuard] },
  {path: 'show-resumes',component:ShowAllResumesComponent,canActivate:[AuthGuard]},
  {path: 'profile',component:TestComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
