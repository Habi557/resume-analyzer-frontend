import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Modal } from 'flowbite';
import { ToastrService } from 'ngx-toastr';
import { filter, map } from 'rxjs';
import { AuthHelperService } from 'src/app/helperclass/auth-helper.service';
import { Dashboard } from 'src/app/models/Dashboard';
import { Resume } from 'src/app/models/Resume';
import { ResumeAnalysis } from 'src/app/models/ResumeAnalysis';
import { LoginService } from 'src/app/services/login.service';
import { SearchSuggestionsService } from 'src/app/services/search-suggestions.service';
import { UploadresumeService } from 'src/app/services/uploadresume.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
  /////////////////
pages: number[]=[0,1,2,3,4];
currentPage: number=0;
pageSize: number=2;
selectedResume: any = null;
filteredSuggestions: string[] = [];
showUploadModal = false;
selectedSkills: string[] = [];
jobDescription:string="";
resumeAnalysis: ResumeAnalysis[]=[]; 
scanAllresumesIsChecked: boolean=false;
showRecentResumes: boolean = true;
listOfResumes: any[]=[];
aiInsights?: Dashboard;
inputSearch: string = '';
profileMenuOpen = false;
user: any;
roles: string[] = [];


constructor(private uploadresumeService: UploadresumeService,private loginService :LoginService, private searchSuggestion : SearchSuggestionsService,private authServiceHelper: AuthHelperService, private toaster: ToastrService,private router:Router){}
  ngOnInit(): void {
    this.onLoad(this.currentPage,this.pageSize);
    this.getAllDashboardDetails();
    this.getAllResumes();
    this.user=this.loginService.getUser();
    this.roles = this.loginService.getUserRoles();

console.log('Running Environment:', environment);

  }
  getAllResumes() {
    this.uploadresumeService.getAllResumes().subscribe({
      next: (result: any[]) => {
        console.log('Fetched resumes:', result);
        this.listOfResumes = result;
      },
      error: (err: any) => {
        console.error('Error fetching resumes:', err);
      }
    })
  }
  openUploadModal() {
    
    this.showUploadModal = true;
  }

  closeUploadModal() {
    this.showUploadModal = false;
  }

  handleUploadComplete() {
    // Refresh your resume list or show success message
    console.log('Upload complete - refresh data');
    this.toaster.success('Upload resume Success', 'Success');
    this.getAllDashboardDetails();
    this.closeUploadModal();
  }
  analyzeResumes(scanAllresumesIsChecked:boolean) {
       this.uploadresumeService.analyzeResumes(this.jobDescription,scanAllresumesIsChecked)
       .subscribe({
        next:(result :ResumeAnalysis)=>{
          console.log(result);
              //this.resumeAnalysis=result; 
              this.getAllDashboardDetails();
              this.onLoad(this.currentPage,this.pageSize);
              this.toaster.success('Resume Analysis Started Successfully', 'Success');       
        },
        error:(err)=>{
          console.log(err);
        }
       })
  }
  onLoad(currentPage:number,pageSize:number): void{
    this.uploadresumeService.getAllAnalysiedResumes(currentPage,pageSize)
    .subscribe({
      next:(result: ResumeAnalysis[])=>{
        // this.resumeAnalysis=result;
        this.resumeAnalysis = result.map(resume => ({
          ...resume,
          analysizedTime: new Date(resume.analysizedTime),
          interviewDate: resume.interviewDate===null ? ' ' : resume.interviewDate, 
          interviewTime: resume.interviewTime===null ? ' ' : resume.interviewTime,
          interviewMode: resume.interviewMode===null ? ' ' : resume.interviewMode,
          selectedStatus: resume.selectedStatus===null ? '' : resume.selectedStatus

        }));
        console.log('Fetched resume analysis:', this.resumeAnalysis);
        
        console.log(this.resumeAnalysis);      
         
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  getAllDashboardDetails():void{
    this.uploadresumeService.getAllDashboardDetails()
    .subscribe({
      next:(result:Dashboard)=>{
        this.aiInsights=result;
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
 
  private convertToDate(timeArray: number[]): Date {
    if (!Array.isArray(timeArray) || timeArray.length < 6) {
      return new Date(); // fallback to current date if invalid
    }
    return new Date(
      timeArray[0], // year
      timeArray[1] - 1, // month (0-indexed)
      timeArray[2], // day
      timeArray[3], // hours
      timeArray[4]  // minutes
      // Ignoring seconds and nanoseconds
    );
  }
goToNextPage() {
 this.pages=this.pages.map((page)=> page+5);
}
goToPage(page: number) {
  this.currentPage=page;
  if(this.inputSearch && this.inputSearch.trim()!==''){
    this.selectSuggestion(this.inputSearch);
    return;
  }
  this.onLoad(page,this.pageSize);
  //this.selectSuggestion(this.inputSearch);

}
goToPreviousPage() {
    this.pages=this.pages.map((page)=> page-5);

  
}
sortBy(orderBy: string) {
  if(orderBy=="yearsOfExperience"){
    this.resumeAnalysis.sort((a,b)=>{
      const exper1=b.resume_id.yearsOfExperience;
     const exper2= a.resume_id.yearsOfExperience;
     return exper1-exper2;
  });
  }
  if(orderBy=="matchPercentage"){
    this.resumeAnalysis.sort((a,b)=>{
      const match1=b.matchPercentage;
     const match2= a.matchPercentage;
     return match1-match2;
  });
  }
  if(orderBy=="newest"){
    this.resumeAnalysis
    .sort((a, b) => b.analysizedTime.getTime() - a.analysizedTime.getTime());

  }
  
  
}




  SearchByNameOrSkill($event: Event) {
    const searchTerm = ($event.target as HTMLInputElement).value.toLowerCase();
    if (searchTerm.length === 0) {
      this.filteredSuggestions = [];
      this.onLoad(this.currentPage, this.pageSize); // Reset to original data
      return;
    }
    if (searchTerm.length > 2) {
      this.searchSuggestion.searchToShowSuggestions(searchTerm).subscribe({
        next: (result: string[]) => {
          console.log('Search results:', result);
         // this.filteredSuggestions = result.split(',').map(item => item.trim());
         this.filteredSuggestions=result;
        },
        error: (err) => {
          this.toaster.error('Error fetching search results', 'Error');
        } 
      })
    }
    
  }
   selectSuggestion(suggestion: string): void {
    this.filteredSuggestions = []; // Hide dropdown
    this.inputSearch = suggestion; // Set input value to selected suggestion
    //this.currentPage=1;
    this.searchSuggestion.findResumesBySkillName(suggestion,this.currentPage, this.pageSize).subscribe({
      next: (result: ResumeAnalysis[]) => {
        console.log('Filtered resumes:', result);
        this.resumeAnalysis=[];
        this.resumeAnalysis = result.map(resume => ({
          ...resume,
          analysizedTime: new Date(resume.analysizedTime)
        }));
      } ,
      error: (err) => {
        this.toaster.error('Error fetching search results', 'Error');
      }
    });              
    
  }
  toggleProfileMenu() {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  logout() {
    this.authServiceHelper.logout();

  }

  goToProfile() {
    //this.router.navigate(['/profile']);
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.profileMenuOpen = false;
    }
  }


 

}
