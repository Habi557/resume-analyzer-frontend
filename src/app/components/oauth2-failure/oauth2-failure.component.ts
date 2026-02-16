import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-oauth2-failure',
  templateUrl: './oauth2-failure.component.html',
  styleUrls: ['./oauth2-failure.component.scss']
})
export class Oauth2FailureComponent implements OnInit {
  constructor(private router: Router,private toaster: ToastrService) {}

  ngOnInit(): void {
    this.toaster.error('OAuth2 login failed. Please try again.', 'Error');
    // Redirect to home after 5 seconds
          this.router.navigate(['/login']);
  }

  }


