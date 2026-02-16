import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthResponse } from 'src/app/models/AuthResponse';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-oauth2-sucess',
  templateUrl: './oauth2-sucess.component.html',
  styleUrls: ['./oauth2-sucess.component.scss']
})
export class Oauth2SucessComponent implements OnInit {
  constructor(private loginservice : LoginService,private route: Router,private toaster :ToastrService) { }
  ngOnInit(): void {
    this.loginservice.oauth2Login().subscribe({
      next: (response: AuthResponse) => {
        console.log('OAuth2 login successful:', response);
          this.loginservice.saveAuthData(response);
       if(this.loginservice.isAdmin()) {
            this.route.navigate(['/dashboard']);

          }else{
            this.route.navigate(['/userdashboard']);
          }
      },
      error: (error) => {
        debugger;
        this.toaster.error(error.error.message, 'Error');
        this.route.navigate(['/login']);
        
      }
    }); 
     
  }


}
