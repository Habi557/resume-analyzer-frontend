import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResumeAnalysis } from '../models/ResumeAnalysis';
import { Resume } from '../models/Resume';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchSuggestionsService {
  

  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl+'search/'; // Adjust the URL as needed
   searchToShowSuggestions(searchTerm: string): Observable<string[]> {
    //return this.http.get<string[]>(`${this.apiUrl}search?query=${searchTerm}`);
    return this.http.get<string[]>(`${this.apiUrl}suggestions`, {
      params: { query: searchTerm },
    });
  }
  findResumesBySkillName(suggestion: string,currentPage: number,pageSize: number) :Observable<ResumeAnalysis[]> {
    return this.http.get<ResumeAnalysis[]>(`${this.apiUrl}analysedresumes`,{params: {skillName: suggestion, currentPage: currentPage,pageSize: pageSize}} )
  }
}
