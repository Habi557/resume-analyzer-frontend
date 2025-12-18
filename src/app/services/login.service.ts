import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  private TOKEN_KEY = "accessToken";
  private REFRESH_KEY = "refreshToken";
  private USER_KEY = "userData";
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
    return user.roles.map((r:any) => r.replace('ROLE_', '')).join(', ')  || [];
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

  logout(): Observable<string> {
    const headers = { Authorization: `Bearer ${this.getAccessToken()}` };
    return this.http.post(`${environment.apiUrl}auth/logout`, {}, { headers, responseType: 'text', withCredentials: true });
  }
}
