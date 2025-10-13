import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl= environment.apiUrl; 
  constructor(private http: HttpClient) { };

  callAi(userQuery: string): Observable<string> {
return this.http.get(`${this.apiUrl}chatbot/query?userQuery=${encodeURIComponent(userQuery)}`, {responseType:  'text'});
  }

}
