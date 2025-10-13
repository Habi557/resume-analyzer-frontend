import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = environment.apiUrl+'email/'; // Replace with your API

  constructor(private http: HttpClient) { }
  sendEmail(id : number, templateName: string,interviewDate?: string,interviewTime?: string,interviewMode?: string): Observable<string> {
    let url = `${this.apiUrl}sendEmail/${id}?templateName=${templateName}`;
     if (interviewDate) {
    url += `&interviewDate=${encodeURIComponent(interviewDate)}`;
  }
  if (interviewTime) {
    url += `&interviewTime=${encodeURIComponent(interviewTime)}`;
  }
  if (interviewMode) {
    url += `&interviewMode=${encodeURIComponent(interviewMode)}`;
  }
    return this.http.get(url, { responseType: 'text' });
  }
}
