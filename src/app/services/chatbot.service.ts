import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl= 'http://localhost:8080/'; 
  constructor(private http: HttpClient) { };

  callAi(userQuery: string): Observable<string> {
return this.http.get(`${this.apiUrl}chatbot/query?userQuery=${encodeURIComponent(userQuery)}`, {responseType: 'text' as 'text'});
  }

}
