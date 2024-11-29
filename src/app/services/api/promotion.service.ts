import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Promotion {
  id: number; // ID của khuyến mãi
  title: string; // Tiêu đề khuyến mãi
  description: string; // Mô tả khuyến mãi
  discount: number; // Phần trăm giảm giá
  startDate: string; // Ngày bắt đầu
  endDate: string; // Ngày kết thúc
}

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private apiUrl = 'https://localhost:44374/api/Promotions'; // Đường dẫn API Promotions

  constructor(private http: HttpClient) {}

  getAllPromotions(): Observable<Promotion[]> {
    return this.http.get<{ $values: Promotion[] }>(this.apiUrl).pipe(
      map(response => response.$values) // Trích xuất danh sách khuyến mãi từ $values
    );
  }
}