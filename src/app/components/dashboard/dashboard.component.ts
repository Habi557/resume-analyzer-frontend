import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Modal } from 'flowbite';
import { ToastrService } from 'ngx-toastr';
import { filter, map } from 'rxjs';
import { Dashboard } from 'src/app/models/Dashboard';
import { ResumeAnalysis } from 'src/app/models/ResumeAnalysis';
import { UploadresumeService } from 'src/app/services/uploadresume.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ///////////////////
    suggestions: string[] = [
    'Java',
    'JavaScript',
    'Angular',
    'Spring Boot',
    'React',
    'Node.js',
    'HTML',
    'CSS',
    'Python'
  ];
  filteredSuggestions: string[] = [];
   selectSuggestion(suggestion: string): void {
    this.filteredSuggestions = []; // Hide dropdown
  }
  /////////////////
totalPages: number=0;
pages: number[]=[1,2,3,4,5];
currentPage: number=1;
pageSize: number=2;
selectedResume: any = null;


showUploadModal = false;
selectedSkills: string[] = [];
jobDescription:string="";
resumeAnalysis: ResumeAnalysis[]=[]; 
scanAllresumesIsChecked: boolean=false;
showRecentResumes: boolean = true;
listOfResumes: any[]=[];
aiInsights?: Dashboard;





constructor(private uploadresumeService: UploadresumeService,private toaster: ToastrService){}
  ngOnInit(): void {
    this.onLoad(this.currentPage,this.pageSize);
    this.getAllDashboardDetails();
    this.getAllResumes();
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


  // resumes = [
  //   { name: 'John Doe', score: 92, experience: 5, location: 'San Francisco, CA', skills: ['Angular', 'TypeScript', 'Node.js'] },
  //   { name: 'Jane Smith', score: 88, experience: 7, location: 'New York, NY', skills: ['React', 'Python', 'Machine Learning'] },
  //   { name: 'Michael Johnson', score: 85, experience: 4, location: 'Austin, TX', skills: ['Vue', 'JavaScript', 'AWS'] },
  //   { name: 'Sarah Williams', score: 82, experience: 3, location: 'Chicago, IL', skills: ['Angular', 'Java', 'Spring Boot'] },
  //   { name: 'David Brown', score: 79, experience: 6, location: 'Seattle, WA', skills: ['React', 'Node.js', 'MongoDB'] },
  //   { name: 'Habibulla', score: 99, experience: 6, location: 'India', skills: ['Angular', 'java', 'spring boot'] }
    

  // ];

  experienceLevels = [
    { id: 'scanAllresumes', label: 'AnalysizeAllResumes' },
    //{ id: 'scanNew', label: 'Mid Level (3-5 years)' },
   // { id: 'senior', label: 'Senior Level (6+ years)' }
  ];

  
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
        },
        error:(err)=>{
          console.log(err);
        }
       })
  }
  onLoad(currentPage:number,pageSize:number): void{
    this.uploadresumeService.getAllAnalysiedResumes(currentPage-1,pageSize)
    .subscribe({
      next:(result: ResumeAnalysis[])=>{
        // this.resumeAnalysis=result;
        this.resumeAnalysis = result.map(resume => ({
          ...resume,
          analysizedTime: new Date(resume.analysizedTime)
        }));
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
        //  this.stats[0].value=result.totalResumes;  
        // this.stats[1].value=result.canditateScanned;  
        // this.stats[2].value=result.bestMatch+'%';
        // this.stats[3].value=result.averageExperience+'y';
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
  console.log(this.pages)
}
goToPage(page: number) {
  console.log("pageNumber ",page);
  this.currentPage=page;
  this.onLoad(page,this.pageSize);
}
goToPreviousPage() {
    this.pages=this.pages.map((page)=> page-5);
      console.log(this.pages)

  
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



openPdf(resumeId: number) {
   this.uploadresumeService.downloadResume(resumeId).subscribe({
      next: (blob: Blob) => {
        // Try opening in new tab first
        const blobUrl = URL.createObjectURL(blob);
        const newWindow = window.open(blobUrl, '_blank');

        // If popup blocked or failed, force download
        if (!newWindow || newWindow.closed) {
          this.forceDownload(blob, 'resume.pdf');
          URL.revokeObjectURL(blobUrl);
        } else {
          // Clean up only after window loads or closes
          newWindow.onload = () => {
            // Add delay to ensure PDF renders
            setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
          };

          // Fallback cleanup if onload doesn't fire
          setTimeout(() => {
            if (!newWindow.closed) {
              URL.revokeObjectURL(blobUrl);
            }
          }, 10000);
        }
      },
      error: (error) => {
        console.error('Download failed', error);
      }
    })
  }
   forceDownload(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  }
  SearchByNameOrSkill($event: Event) {
    const searchTerm = ($event.target as HTMLInputElement).value.toLowerCase();
    console.log(searchTerm);
    if (searchTerm.length === 0) {
      this.filteredSuggestions = [];
      return;
    }

    this.filteredSuggestions = this.suggestions.filter(
      suggestion => suggestion.toLowerCase().includes(searchTerm)
    );
    
    
  }
  

}
