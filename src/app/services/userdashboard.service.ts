import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Resume } from '../models/Resume';
import { Observable } from 'rxjs';
import { ResumeAnalysis } from '../models/ResumeAnalysis';

@Injectable({
  providedIn: 'root'
})
export class UserdashboardService {
  constructor(private http: HttpClient) { }
  getResumes(name: string) : Observable<ResumeAnalysis[]>{
    return this.http.get<ResumeAnalysis[]>(`${environment.apiUrl}user/getUserAnalyisedDetails?username=${name}`);
  }

}
