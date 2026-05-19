import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
    constructor(private http:HttpClient) { }
  deleteResume(resumeId: number): Observable<ApiResponse<string>> {
 
    return this.http.delete<ApiResponse<string>>(`${environment.apiUrl}resume/delete/${resumeId}`);
  }

}
