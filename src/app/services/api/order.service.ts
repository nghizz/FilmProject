import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../../models/payment.model';
// Service: order.service.ts
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'https://localhost:7233/api/Orders';  // URL API

  constructor(private http: HttpClient) { }

  // Tạo đơn hàng mới
  createOrder(paymentDto: Payment): Observable<any> {  // Dùng 'any' hoặc define DTO type
    return this.http.post(this.apiUrl, paymentDto);  // Gọi API
  }

  // Phương thức để lấy lịch sử đơn hàng
  getOrderHistory(userId: number): Observable<any> {  
    const url = `${this.apiUrl}/history/${userId}`; // URL API để lấy lịch sử đơn hàng
    return this.http.get(url);
  }
}
