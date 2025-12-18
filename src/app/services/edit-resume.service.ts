import { Injectable } from '@angular/core';
import { ResumeAnalysis } from '../models/ResumeAnalysis';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Resume } from '../models/Resume';
import { EditResumeDeatilsDto } from '../models/EditResumeDeatilsDto';

@Injectable({
  providedIn: 'root'
})
export class EditResumeService {
  constructor(private http: HttpClient) { }
    updateCandidateDetails(editResumeDetailsDto: EditResumeDeatilsDto):Observable<string> {  
     return this.http.post<string>(`${environment.apiUrl}editResumeDetails/edit`, editResumeDetailsDto,{ responseType: 'text' as 'json' });
  }
}
