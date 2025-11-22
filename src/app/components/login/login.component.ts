import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private fb: FormBuilder,private loginService :LoginService, private route:Router) {}

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
        next: (response:any) => {
          console.log('Login successful:', response);
          this.route.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          // Handle login error, e.g., show error message
        }
       });
    }
  }

}
