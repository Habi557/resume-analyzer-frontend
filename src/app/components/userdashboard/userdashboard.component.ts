import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthHelperService } from 'src/app/helperclass/auth-helper.service';
import { Resume } from 'src/app/models/Resume';
import { ResumeAnalysis } from 'src/app/models/ResumeAnalysis';
import { LoginService } from 'src/app/services/login.service';
import { UserdashboardService } from 'src/app/services/userdashboard.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss']
})
export class UserdashboardComponent implements OnInit {
  constructor(private loginService: LoginService, private authServiceHelper: AuthHelperService,private userdasbordService : UserdashboardService, private toaster: ToastrService) { }
  // profileMenuOpen = false;
  // showUploadModal = false;
   user: any ;
   roles: string[] = [];
  resumeAnalysis: ResumeAnalysis[] = [];
  ngOnInit(): void {
    this.user=this.loginService.getUser();
    this.roles = this.loginService.getUserRoles();
   this.loadUserData()

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
  // toggleProfileMenu() {
  //   this.profileMenuOpen = !this.profileMenuOpen;
  // }

  // logout() {
  //   this.authServiceHelper.logout();

  // }
  // closeUploadModal() {
  //   this.showUploadModal = false;
  // }
  // openUploadModal() {
  //   this.showUploadModal = true;
  // }
  // handleUploadComplete() {
  //   this.toaster.success('Upload resume Success', 'Success');
  //   this.closeUploadModal();
  // }
  userStats = {
    totalResumes: 2,
    bestMatch: 72,
    avgExperience: 3,
    activeResumeName: "Habibulla_Resume.pdf"
  };
  myResumes = [
    {
      name: "Habibulla Resume.pdf",
      experience: 3,
      matchScore: 72,
      redFlags: ["Missing phone number", "No portfolio links"]
    },
    {
      name: "Habibulla Java Resume.pdf",
      experience: 3,
      matchScore: 59,
      redFlags: ["Missing email"]
    }
  ];

  // ===== AI INSIGHTS (USER ONLY) =====
  userInsights = {
    topSkills: ["Java", "Spring Boot", "REST APIs", "MySQL", "Angular"],
    recommendation:
      "Highlight your contributions to Spring Boot microservices. Add GitHub links for your Angular projects to strengthen portfolio visibility."
  };
}
