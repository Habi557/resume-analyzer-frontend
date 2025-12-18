import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {

  constructor(private loginService: LoginService,private toaster:ToastrService,private router:Router) { }
  logout() {
     this.loginService.logout().subscribe({
          next: (result: string) => {
            console.log(result);
            this.toaster.success('Logged out successfully', 'Success');
            this.loginService.removeAuthData();
            this.router.navigate(['/login']);
          },
          error: (err) => {
                    debugger;
    
            console.log(err);
          }
        }) 

  }
  
}
