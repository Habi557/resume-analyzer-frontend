import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { AuthResponse } from 'src/app/models/AuthResponse';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private apiUrl= environment.apiUrl; 
loginWithGoogle() {
  //window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  window.location.href = `${this.apiUrl}oauth2/authorization/google`;
}
  constructor(private fb: FormBuilder,private loginService :LoginService, private route:Router,private toaster: ToastrService) {}

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
  });

    onLogin() {
    if (this.loginForm.valid) {
       const loginData:Login = {
         username: this.loginForm.get('username')?.value ?? '',
         password: this.loginForm.get('password')?.value ?? ''
       };
       this.loginService.login(loginData).subscribe({
        next: (response:AuthResponse) => {
          console.log('Login successful:', response);
          this.loginService.saveAuthData(response);
          if(this.loginService.isAdmin()) {
            this.route.navigate(['/dashboard']);

          }else{
            this.route.navigate(['/userdashboard']);
          }
          this.toaster.success('Login Successful');
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.toaster.error('Login Failed. Please check your credentials.');
          // Handle login error, e.g., show error message
        }
       });
    }
  }

}
