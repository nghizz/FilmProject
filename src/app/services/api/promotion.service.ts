import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { Promotion } from '../../models/promotion.model';


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