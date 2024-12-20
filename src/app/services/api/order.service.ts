import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../../models/payment.model'; // Đảm bảo DTO đúng với cấu trúc của bạn
// Service: order.service.ts
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'https://localhost:7233/api/Orders';  // URL API của bạn

  constructor(private http: HttpClient) { }

  // Tạo đơn hàng mới
  createOrder(paymentDto: Payment): Observable<any> {  // Dùng 'any' hoặc define DTO type ở đây
    return this.http.post(this.apiUrl, paymentDto);  // Gọi API
  }
}
