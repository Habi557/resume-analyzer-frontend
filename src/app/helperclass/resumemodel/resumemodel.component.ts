import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ToastrService } from 'ngx-toastr';
import { EditResumeDeatilsDto } from 'src/app/models/EditResumeDeatilsDto';
import { ResumeAnalysis } from 'src/app/models/ResumeAnalysis';
import { EditResumeService } from 'src/app/services/edit-resume.service';
import { EmailService } from 'src/app/services/email.service';
import { LoginService } from 'src/app/services/login.service';
import { UploadresumeService } from 'src/app/services/uploadresume.service';

@Component({
  selector: 'app-resumemodel',
  templateUrl: './resumemodel.component.html',
  styleUrls: ['./resumemodel.component.scss']
})
export class ResumemodelComponent implements OnInit{

  constructor(private uploadService: UploadresumeService, private emailService: EmailService,public loginService: LoginService, private editResume: EditResumeService, private toaster: ToastrService) { }
  ngOnInit(): void {
    console.log("Resume Modal Component initialized with resumeFilter:", this.resumeFilter);
   // this.resumeFilter.interviewTime = this.
   this.times();
  if(this.resumeFilter.selectedStatus== undefined || this.resumeFilter.selectedStatus == null) {
     // this.resumeFilter.selectedStatus = " "; // Default value
    }

  }
  ////////////////////////////////
  //Testing 

  selectedInterviewMode: string = '';
interviewDate: string = '';





times12Hr: string[] = [];

times(): void {

   const times = [];
  for (let h = 1; h <= 12; h++) {
    for (let m of ['00', '15', '30', '45']) {
      times.push(`${h}:${m} AM`);
      times.push(`${h}:${m} PM`);
    }
  }
  this.times12Hr = times;
}



dropdownOptions = [
  //'Shortlisted',
  'Selected',
  //'Pending Review',
  'Rejected',
  'Scheduled for Interview'
];
selectedStatus: string = '';
selectOption(value: string) {
  this.resumeFilter.selectedStatus = value;
  this.selectedStatus = value;
  console.log("value selected:", value);
  this.isDropdownOpen = false;
}
onDateSelected(event: any) {
  this.interviewDate = event.target.value;
  console.log("Picked date:", this.interviewDate);
}
sendInterviewInvite() {
  console.log("test1");
  
     console.log(this.resumeFilter.interviewDate);
     
}




/////////////////

  isOpen = false; // flag to control modal visibility
  @Input()
  resumeFilter!: ResumeAnalysis;
  editResumeDetailsDto!: EditResumeDeatilsDto;
  //selectedStatus: string = '';
  editProfile = false;
  isDropdownOpen = false;

  openModel() {
    this.isOpen = true;
    setTimeout(() => initFlowbite(), 10);
    //document.body.style.overflow = 'hidden'; // optional: disable background scroll
    console.log("Modal opened with resumeFilter:", this.resumeFilter);
   // document.body.classList.add('overflow-hidden');

  }

  closeModel() {
    this.isOpen = false;
    console.log("Modal closed");
     // document.body.classList.remove('overflow-hidden');


  }
  saveCandidateDetails() {
    console.log(this.resumeFilter.resume_id.name);
    
    const resumeDeatails=this.resumeFilter.resume_id;
    this.editResumeDetailsDto={
      id: resumeDeatails.id,
      name: resumeDeatails.name,
      email: resumeDeatails.email,
      address: resumeDeatails.address,
      education: resumeDeatails.education,
      yearsOfExperience: resumeDeatails.yearsOfExperience
    };


    console.log("Saving candidate details for resume ID:", resumeDeatails);
    this.editResume.updateCandidateDetails(this.editResumeDetailsDto).subscribe({
      next: (response: string) => {
        alert("Candidate details updated successfully.");
      },
      error:(error)=>{
        console.error("Error updating candidate details:", error);
      }

      
    })
      

  }


  onStatusChange(event: Event): void {
    const newValue = (event.target as HTMLSelectElement).value;
    console.log('Resume status changed to:', newValue);
    if (newValue != 'interview_scheduled') {
      this.emailService.sendEmail(this.resumeFilter.id, newValue).subscribe({
        next: (response: string) => {
          console.log('Email sent successfully:', response);
          this.toaster.success(response, 'Success');
          //this.handleStatusChange(newValue);
        },
        error: (error: HttpErrorResponse) => {
          try {
            const parsed = JSON.parse(error.error);
            this.toaster.error(parsed.detail, 'Error');

          } catch (e) {
          this.toaster.error("Could not parse error: ", 'Error');

          }

        }
      });
    }
  }

  sendInterviewEmail() {
    
    const time=this.formatTime(this.resumeFilter.interviewTime);
    console.log('time',time);
    if (this.resumeFilter.interviewDate && this.resumeFilter.interviewTime  && this.resumeFilter.interviewMode && this.resumeFilter.selectedStatus) {
      this.emailService.sendEmail(
        this.resumeFilter.id,
        this.resumeFilter.selectedStatus,
        this.resumeFilter.interviewDate,
        this.resumeFilter.interviewTime,
        this.resumeFilter.interviewMode
      ).subscribe({
        next: (response: string) => {
          console.log('Interview email sent successlly:', response);
          this.toaster.success('Interview email sent successlly:', 'Success');
          this.closeModel();
        },
        error: (error: HttpErrorResponse) => {
            try {
            const parsed = JSON.parse(error.error);
            this.toaster.error(parsed.detail, 'Error');

          } catch (e) {
          this.toaster.error("Could not parse error: ", 'Error');

          }
        }
      });
    } else {
      this.toaster.error('Please fill all interview details', 'Error');
    }
  }
  formatTime(time24: string): string {
    const [hourStr, minute] = time24.split(':');
    let hour = +hourStr;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${this.pad(hour)}:${minute} ${ampm}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }







}
