import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private loginService: LoginService,private router:Router,private toaster:ToastrService) {}
  canActivate():  boolean {
    if (this.loginService.isAdmin()) {
      return true;
    }
    this.toaster.warning(
      'You are not authorized to access Admin Dashboard',
      'Access Denied'
    );
    this.router.navigate(['/userdashboard']);
    return false;
  }
  
}
