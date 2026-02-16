import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResumeAnalysis } from '../models/ResumeAnalysis';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl= environment.apiUrl; 
  constructor(private http: HttpClient) { };

  callAi(userQuery: string): Observable<ResumeAnalysis[]> {
return this.http.get<ResumeAnalysis[]>(`${this.apiUrl}chatbot/query?userQuery=${encodeURIComponent(userQuery)}`);
  }

}
