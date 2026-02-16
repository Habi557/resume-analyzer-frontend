import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';
import { environment } from 'src/environments/environment';
import { Signup } from '../models/Signup';
import { ApiResponse } from '../models/ApiResponse';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http:HttpClient) { }
  private TOKEN_KEY = "accessToken";
  private REFRESH_KEY = "refreshToken";
  private USER_KEY = "userData";
  private rolesSubject$ = new BehaviorSubject<string[]>([]);
  rolesChange$ = this.rolesSubject$.asObservable();
  login(loginData: Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}auth/login`, loginData,{ withCredentials: true });
  }
  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}auth/refreshToken`,{},{ withCredentials: true } );
  }
  saveAuthData(data: AuthResponse) {
    localStorage.setItem(this.TOKEN_KEY, data.accessToken);
    //localStorage.setItem(this.REFRESH_KEY, data.refreshToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify({
      username: data.username,
      roles: data.roles
    }));

  }
  removeAuthData() {
    localStorage.removeItem(this.TOKEN_KEY);
    //localStorage.removeItem(this.REFRESH_KEY);
    localStorage.removeItem(this.USER_KEY);
        this.rolesSubject$.next([]);

  }

  getAccessToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }
  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  getUser() {
    return JSON.parse(localStorage.getItem(this.USER_KEY) || '{}');
  }
  getUserRoles(): string[] {
    const user = this.getUser();
    return user.roles?.map((r:any) => r.replace('ROLE_', '')).join(', ')  || [];
  }
  getLoggedInUser():any {
    const user=localStorage.getItem("userData");
  }
    hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(r => this.hasRole(r));
  }

  isAdmin(): boolean {
    return this.hasRole('ADMIN');
  }

  isUser(): boolean {
    return this.hasRole('USER');
  }
  notifyAuthChange() {
    const roles=this.getUserRoles();
    this.rolesSubject$.next(roles);
  }

  logout(): Observable<string> {
    const headers = { Authorization: `Bearer ${this.getAccessToken()}` };
    return this.http.post(`${environment.apiUrl}auth/logout`, {}, { headers, responseType: 'text', withCredentials: true });
  }
  signup(signupData: Signup): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${environment.apiUrl}auth/register`, signupData);
  }
  oauth2Login(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${environment.apiUrl}oauth-success`, { withCredentials: true });
  } 

}
