import { Component, EventEmitter, Output } from '@angular/core';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { UploadresumeService } from 'src/app/services/uploadresume.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-uploadresume',
  templateUrl: './uploadresume.component.html',
  styleUrls: ['./uploadresume.component.scss']
})
export class UploadresumeComponent {

  @Output() uploadComplete = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();
  
  selectedFiles: File[] = [];
  uploadProgress: number | null = null;
  isUploading = false;
  dragOver = false;
  errorMessage: string | null = null;

  constructor(private uploadService: UploadresumeService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  private handleFiles(files: FileList) {
    this.errorMessage = null;
    this.selectedFiles = [];
    
    Array.from(files).forEach(file => {
      if (this.isValidFileType(file)) {
        if (file.size <= 10 * 1024 * 1024) { // 10MB limit
          this.selectedFiles.push(file);
        } else {
          this.errorMessage = `File ${file.name} exceeds 10MB limit`;
        }
      } else {
        this.errorMessage = `Invalid file type for ${file.name}. Only PDF, DOC, DOCX allowed`;
      }
    });
  }

  private isValidFileType(file: File): boolean {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    return validTypes.includes(file.type);
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  uploadFiles() {
    if (this.selectedFiles.length === 0) return;
    
    this.isUploading = true;
    this.uploadProgress = 0;
    
    this.uploadService.uploadResumes(this.selectedFiles).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round(100 * event.loaded / event.total);
        } else if (event.type === HttpEventType.Response) {
          this.isUploading = false;
          this.uploadComplete.emit();
          this.closeModal.emit();

        }

      },
      error: (err: HttpErrorResponse) => {
        debugger;
        this.isUploading = false;
        console.log(err)
        this.errorMessage = err.error.message || 'Upload failed. Please try again.';
        // if (typeof err.error === 'string') {
        //   this.errorMessage = err.error || 'Upload failed. Please try again.';
        // } else {
        //   this.errorMessage = err.error || 'Upload failed. Please try again.';
        // }
      }
    });
  }
}
