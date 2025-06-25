import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResumeFilter } from 'src/app/models/ResumeFilter';
import { EmailService } from 'src/app/services/email.service';
import { UploadresumeService } from 'src/app/services/uploadresume.service';

@Component({
  selector: 'app-resumemodel',
  templateUrl: './resumemodel.component.html',
  styleUrls: ['./resumemodel.component.scss']
})
export class ResumemodelComponent {

  constructor(private uploadService: UploadresumeService, private emailService :EmailService, private toaster: ToastrService) { }
  isOpen = false; // flag to control modal visibility
  @Input()
  resumeFilter!: ResumeFilter;
  selectedStatus: string = '';

  openModel() {
    this.isOpen = true;
    //document.body.style.overflow = 'hidden'; // optional: disable background scroll

  }

  closeModel() {
    this.isOpen = false;
    console.log("Modal closed");

  }
  downloadResume(resumeId: Number): void {
    console.log("Download resume with ID:", resumeId);
    this.uploadService.downloadResume(resumeId).subscribe({
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

  onStatusChange(event: Event): void {
  const newValue = (event.target as HTMLSelectElement).value;
  console.log('Resume status changed to:', newValue);
  this.emailService.sendEmail(this.resumeFilter.resume_id.id, newValue).subscribe({
    next: (response: string) => {
      console.log('Email sent successfully:', response);
      this.toaster.success(response, 'Success');
      //this.handleStatusChange(newValue);
    },
    error: (error) => {
      console.error('Error sending email:', error);
      this.toaster.error(error, 'Error');
    }
  });

  // Optionally perform actions like:
  // - Update DB
  // - Show toast
  // - Trigger email
}




}
