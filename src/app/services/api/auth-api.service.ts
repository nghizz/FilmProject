import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private apiUrl = 'https://localhost:7233/api'; // URL chính xác cho backend

  constructor(private http: HttpClient) {}

  //Đăng ký người dùng
 register(userDetails: { username: string; password: string; confirmPassword: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/Users/register`, userDetails, {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }).pipe(
    tap((response: any) => {
      // Kiểm tra nếu phản hồi thành công và có dữ liệu người dùng
      if (response && response.user) {
        // Kiểm tra môi trường là trình duyệt (browser) trước khi sử dụng localStorage
        if (typeof window !== 'undefined' && window.localStorage) {
          // Lưu thông tin người dùng vào localStorage
          localStorage.setItem('username', response.user.username);
          localStorage.setItem('auth_token', response.token);
        }
      }
    }),
    catchError((error: any) => {
      console.error('Đăng ký thất bại:', error);
      return throwError(() => new Error('Đăng ký thất bại. Vui lòng thử lại.'));
    })
  );
  }
  // Đăng nhập người dùng
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/Users/login`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap((response: any) => {
        if (response && response.user) {
          // Kiểm tra nếu môi trường là trình duyệt (browser) trước khi sử dụng localStorage
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('username', response.user.username);
            localStorage.setItem('auth_token', response.token);
          }
        }
      })
    );
  }
}