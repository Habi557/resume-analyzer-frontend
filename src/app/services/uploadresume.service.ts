import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResumeFilter } from '../models/ResumeFilter';
import { Dashboard } from '../models/Dashboard';
@Injectable({
  providedIn: 'root'
})
export class UploadresumeService {
    
  private apiUrl = 'http://localhost:8080/ai/'; // Replace with your API

  constructor(private http: HttpClient) { }

  uploadResumes(files: File[]): Observable<HttpEvent<string>> {
    const formData = new FormData();
    files.forEach(file => formData.append('file', file, file.name));

    const req = new HttpRequest('POST', this.apiUrl+'upload', formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  // return this.http.post(this.apiUrl,req,{});

  }
  analyzeResumes(jobDescription: string, scanAllresumesIsChecked: boolean) {
    return this.http.post(`${this.apiUrl}screen-resume?scanAllresumesIsChecked=${scanAllresumesIsChecked}&jobRole=${jobDescription}`,{responseType:'json'});
  }
  getAllAnalysiedResumes(pageNo:number,pageSize:number): Observable<ResumeFilter[]> {
    return this.http.get<ResumeFilter[]>(`${this.apiUrl}getAllAnalysiedResumes?pageNo=${pageNo}&pageSize=${pageSize}`);
  }
  getAllDashboardDetails(): Observable<Dashboard> {
   return this.http.get<Dashboard>(this.apiUrl+'gellAllDashboardDetails');
  }
  downloadResume(resumeId: Number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}downloadResume/${resumeId}`, {
      responseType: 'blob',
      headers: new HttpHeaders({
        'Accept': 'application/pdf' // Explicitly ask for PDF
      })
    });
  }
  getAllResumes(): Observable<any> {
    return this.http.get(`${this.apiUrl}allResumes`);
  }
 
  
}
