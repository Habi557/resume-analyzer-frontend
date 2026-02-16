import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from 'src/app/models/ApiResponse';
import { Signup } from 'src/app/models/Signup';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
    constructor(private fb: FormBuilder,private loginservie:LoginService,private toaster:ToastrService) {}

  signupForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatch });
  

 passwordMatch(group: AbstractControl): ValidationErrors | null {
  return group.get('password')?.value === group.get('confirmPassword')?.value
    ? null
    : { notMatching: true };
}
toRegisterModel(): Signup {
  return {
    username: this.signupForm.value.username!,
    email: this.signupForm.value.email!,
    password: this.signupForm.value.password!,
    provider: 'LOCAL'
  };
}


  submit(){
    if(this.signupForm.valid) {
      const registerform=this.toRegisterModel();
      console.log("registerform"+registerform);
       this.loginservie.signup(registerform).subscribe({
        next: (data:ApiResponse<string>) => {
          console.log('Signup successful:', data);
          this.toaster.success(data.message, 'Success');
          this.signupForm.reset();
        },
        error: (err:any) => {
         // console.error('Error during signup:', err);
          this.toaster.error(err.error.detail, 'Error');
        }
       })
    }
  }
}
