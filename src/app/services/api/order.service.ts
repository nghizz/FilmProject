import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Payment } from '../../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'https://localhost:7233/api/Orders'; 

  constructor(private http: HttpClient) { }

  createOrder(paymentDto: Payment): Observable<any> { 
    return this.http.post(this.apiUrl, paymentDto).pipe(
      catchError(this.handleError) // Thêm xử lý lỗi
    );
  }

  getOrderHistory(userId: number): Observable<any> {  
    const url = `${this.apiUrl}/history/${userId}`; 
    return this.http.get(url).pipe(
      catchError(this.handleError) // Thêm xử lý lỗi
    );
  }

  // Hàm xử lý lỗi
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // Lỗi client-side hoặc lỗi mạng
      console.error('An error occurred:', error.error);
    } else {
      // Lỗi server-side
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Trả về lỗi để component có thể xử lý
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}