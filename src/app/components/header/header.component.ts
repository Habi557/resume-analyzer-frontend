import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  implements OnInit {
  constructor(private toaster: ToastrService,private router: Router,private loginservice: LoginService) { }
  ngOnInit(): void {
    console.log("roles "+ this.roles);
    
  }

  @Input() showRecentResumes!: boolean;
  @Input()showUploadModal!: boolean;
  @Input()user: any;
  @Input()roles: string[]=[];
  @Input()profileMenuOpen!: boolean;
  @Output() logoutEvent = new EventEmitter<void>();
  @Output() goToProfileEvent = new EventEmitter<void>();
  @Output() toggleProfileMenuEvent = new EventEmitter<void>();
  @Output() closeUploadModalEvent = new EventEmitter<void>();
  @Output() handleUploadCompleteEvent = new EventEmitter<void>();
  @Output() openUploadModalEvent = new EventEmitter<void>();
  @Output() showRecentResumesChange = new EventEmitter<boolean>();

  isAdmin(): boolean {
    return this.loginservice.isAdmin();
  }
  logout() {
    this.logoutEvent.emit();
  }
  goToProfile() {
    this.router.navigate(['/profile']);
  }
  toggleProfileMenu() {
    this.toggleProfileMenuEvent.emit();
    //throw new Error('Method not implemented.');
  }
  closeUploadModal() {
    this.closeUploadModalEvent.emit();
  }
  handleUploadComplete() {
    this.handleUploadCompleteEvent.emit();
  }
  openUploadModal() {
    this.openUploadModalEvent.emit();

  }
  showRecentResumesStatus() {
  this.showRecentResumes = !this.showRecentResumes;
  this.showRecentResumesChange.emit(this.showRecentResumes);
  this.router.navigate(['/show-resumes']);
}






}
