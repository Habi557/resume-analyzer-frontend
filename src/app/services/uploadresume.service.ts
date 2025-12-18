import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResumeAnalysis } from '../models/ResumeAnalysis';
import { Dashboard } from '../models/Dashboard';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class UploadresumeService {
 
  private apiUrl = environment.apiUrl+'ai/'; // Replace with your API

  constructor(private http: HttpClient,private loginservice :LoginService) { }

  uploadResumes(files: File[]): Observable<HttpEvent<string>> {
    const formData = new FormData();
    const username=this.loginservice.getUser().username;
    files.forEach(file => formData.append('file', file, file.name));
    const req = new HttpRequest('POST', `${this.apiUrl}upload?username=${username}`, formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);

  }
  analyzeResumes(jobDescription: string, scanAllresumesIsChecked: boolean) : Observable<ResumeAnalysis> {
    //return this.http.post<ResumeAnalysis>(`${this.apiUrl}screen-resume?scanAllresumesIsChecked=${scanAllresumesIsChecked}&jobRole=${jobDescription}`,{responseType:'json'});
    const url = `${this.apiUrl}screen-resume?scanAllresumesIsChecked=${scanAllresumesIsChecked}`;
    return this.http.post<ResumeAnalysis>(url, { jobDescription }, { responseType: 'json' });

  }
  getAllAnalysiedResumes(pageNo:number,pageSize:number): Observable<ResumeAnalysis[]> {
    return this.http.get<ResumeAnalysis[]>(`${this.apiUrl}getAllAnalysiedResumes?pageNo=${pageNo}&pageSize=${pageSize}`);
  }
  getAllDashboardDetails(): Observable<Dashboard> {
   return this.http.get<Dashboard>(this.apiUrl+'gellAllDashboardDetails');
  }
  downloadResume(resumeId: Number): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.apiUrl}downloadResume/${resumeId}`, {
      responseType: 'blob',
      observe: 'response'
      // headers: new HttpHeaders({
      //   'Accept': 'application/pdf' // Explicitly ask for PDF
      // })
    });
  }
  getAllResumes(): Observable<any> {
    return this.http.get(`${this.apiUrl}allResumes`);
  }
  
 
  
}
