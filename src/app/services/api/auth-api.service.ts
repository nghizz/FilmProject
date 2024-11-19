import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private apiUrl = 'https://localhost:7233/api/';  // Đảm bảo URL chính xác cho backend

  constructor(private http: HttpClient) { }

  // Đăng nhập người dùng
  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}Users/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
