import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PromotionHistory } from '../../models/promotion-history.model';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private apiUrl = 'https://localhost:7233/api/Users';  // Đảm bảo URL chính xác

  constructor(private http: HttpClient) { }

  // API lấy tất cả người dùng
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getPromotionHistory(userId: number): Observable<PromotionHistory[]> { 
    const url = `${this.apiUrl}/history/${userId}`; 
    return this.http.get<PromotionHistory[]>(url); 
  }
}
