import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:8080/email/'; // Replace with your API

  constructor(private http: HttpClient) { }
  sendEmail(id : number, templateName: string): Observable<string> {
    return this.http.get(`${this.apiUrl}sendEmail/${id}?templateName=${templateName}`, { responseType: 'text' }) as Observable<string>;
  }
}
