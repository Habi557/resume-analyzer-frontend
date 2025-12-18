import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthHelperService } from './helperclass/auth-helper.service';
import { ResumeAnalysis } from './models/ResumeAnalysis';
import { LoginService } from './services/login.service';
import { UserdashboardService } from './services/userdashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

   constructor(private loginService: LoginService, private authServiceHelper: AuthHelperService,private userdasbordService : UserdashboardService, private toaster: ToastrService,private router:Router) { }
    profileMenuOpen = false;
    showUploadModal = false;
    showRecentResumes: boolean = true;
    user: any ;
    roles: string[] = [];
    resumeAnalysis: ResumeAnalysis[] = [];
    ngOnInit(): void {
      this.user=this.loginService.getUser();
      this.roles = this.loginService.getUserRoles();
     //this.loadUserData()
  
    }
    hideHeader() {
    return this.router.url === '/login';  // hide on login page
  }
    loadUserData() {    
      this.userdasbordService.getResumes(this.user.username).subscribe({
        next: (data:ResumeAnalysis[]) => {
          this.resumeAnalysis = data;
          // Process and display the data as needed
        },
        error: (err:any) => {
          console.error('Error fetching user resumes data:', err);
        }
      })
    }
    toggleProfileMenu() {
      this.profileMenuOpen = !this.profileMenuOpen;
    }
  
    logout() {
      this.authServiceHelper.logout();
  
    }
    closeUploadModal() {
      this.showUploadModal = false;
    }
    openUploadModal() {
      this.showUploadModal = true;
    }
    handleUploadComplete() {
      // Refresh your resume list or show success message
      console.log('Upload complete - refresh data');
      this.toaster.success('Upload resume Success', 'Success');
      //this.getAllDashboardDetails();
      this.closeUploadModal();
    }
}
