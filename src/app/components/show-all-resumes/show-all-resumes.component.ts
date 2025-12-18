import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UploadresumeService } from 'src/app/services/uploadresume.service';

@Component({
  selector: 'app-show-all-resumes',
  templateUrl: './show-all-resumes.component.html',
  styleUrls: ['./show-all-resumes.component.scss']
})
export class ShowAllResumesComponent implements OnInit {
  constructor(private uploadresumeService: UploadresumeService, private toaster: ToastrService) {}
  listOfResumes: any[]=[];
  ngOnInit(): void {
    this.getAllResumes();
  }
  getAllResumes() {
    this.uploadresumeService.getAllResumes().subscribe({
      next: (result: any[]) => {
        this.listOfResumes = result;
      },
      error: (err: any) => {
        console.error('Error fetching resumes:', err);
      }
    })
  }
  // openPdf(resumeId: number) {
  //  this.uploadresumeService.downloadResume(resumeId).subscribe({
  //     next: (blob: Blob) => {
  //       // Try opening in new tab first
  //       const blobUrl = URL.createObjectURL(blob);
  //       const newWindow = window.open(blobUrl, '_blank');

  //       // If popup blocked or failed, force download
  //       if (!newWindow || newWindow.closed) {
  //         this.forceDownload(blob, 'resume');
  //         URL.revokeObjectURL(blobUrl);
  //       } else {
  //         // Clean up only after window loads or closes
  //         newWindow.onload = () => {
  //           // Add delay to ensure PDF renders
  //           setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
  //         };

  //         // Fallback cleanup if onload doesn't fire
  //         setTimeout(() => {
  //           if (!newWindow.closed) {
  //             URL.revokeObjectURL(blobUrl);
  //           }
  //         }, 10000);
  //       }
  //     },
  //    error: (err) => {
  //      const reader = new FileReader();
  //      reader.onload = () => {
  //        console.log("Message from backend:", reader.result);
  //        this.toaster.error(reader.result as string, 'Error');
  //      };
  //      reader.readAsText(err.error);
  //    }
  //   })
  // }
  openPdf(resumeId: number) {
  this.uploadresumeService.downloadResume(resumeId).subscribe({
    next: (response: any) => {      
      const blob = response.body as Blob;
      const contentType = response.headers.get('content-type') || '';
      const fileName = this.getFileName(response) || this.fallbackName(contentType);
     // const fileName = response.fileName;

      // ✅ Open PDF in new tab
      if (contentType.includes('pdf')) {
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      }
      // ✅ Download DOC / DOCX / others
      else {
        this.forceDownload(blob, fileName);
      }
    },
    error: (err) => {
      //this.handleError(err);
      alert('Error downloading resume.');
    }
  });
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
  getFileName(response: any): string | null {
  const disposition = response.headers.get('content-disposition');
  if (!disposition) {
    return null;
  }

  // Handles: attachment; filename="resume.docx"
  const match = disposition.match(/filename="?([^"]+)"?/);
  return match ? match[1] : null;
}
fallbackName(contentType: string): string {
  if (!contentType) {
    return 'file';
  }

  if (contentType.includes('pdf')) {
    return 'resume.pdf';
  }

  if (
    contentType.includes('msword') ||
    contentType.includes('wordprocessingml')
  ) {
    return 'resume.docx';
  }

  return 'resume';
}



}
