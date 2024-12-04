import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';

export interface Promotion {
  id: number; // ID của khuyến mãi
  title: string; // Tiêu đề khuyến mãi
  description: string; // Mô tả khuyến mãi
  discount: number; // Phần trăm giảm giá
  startDate: string; // Ngày bắt đầu
  endDate: string; // Ngày kết thúc
  imageUrl: string; // Đường dẫn ảnh khuyến mãi
}

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private apiUrl = 'https://localhost:7233/api/Promotions'; // Đường dẫn API Promotions

  constructor(private http: HttpClient) {}

  getAllPromotions(): Observable<Promotion[]> {
    return this.http.get<{ $values: Promotion[] }>(this.apiUrl).pipe(
      map(response => response.$values), // Trích xuất danh sách khuyến mãi từ $values
      catchError(error => {
        console.error('Lỗi khi lấy danh sách khuyến mãi:', error);
        return throwError(() => new Error('Không thể lấy danh sách khuyến mãi. Vui lòng thử lại sau.'));
      })
    );
  }
}