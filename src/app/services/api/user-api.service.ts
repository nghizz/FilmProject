import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PromotionHistory {
  orderId: number; // ID của đơn hàng
  promotionName: string; // Tên khuyến mãi
  promotionDescription: string; // Mô tả khuyến mãi
  discountPercentage: number; // Phần trăm giảm giá
  usedDate: string; // Ngày sử dụng khuyến mãi
  startDate: string; // Ngày bắt đầu hiệu lực của khuyến mãi
  endDate: string; // Ngày kết thúc hiệu lực của khuyến mãi
}

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

    // Gọi API: Lấy lịch sử sử dụng khuyến mãi
    getPromotionHistory(userId: number): Observable<PromotionHistory[]> {
      return this.http.get<PromotionHistory[]>(`${this.apiUrl}/history/${userId}`);
    }
}
