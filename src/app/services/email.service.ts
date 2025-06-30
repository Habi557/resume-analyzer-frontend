import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:8080/email/'; // Replace with your API

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
    return this.http.get(url, { responseType: 'text' })as Observable<string>;
  }
}
