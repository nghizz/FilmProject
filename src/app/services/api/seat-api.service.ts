import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Seat } from '../../models/seat.model';

@Injectable({
  providedIn: 'root'
})
export class SeatApiService {
  private apiUrl = 'https://localhost:7233/api/Seats'; // Base URL for API

  constructor(private http: HttpClient) {}

  // Get available seats
  getAvailableSeats(): Observable<Seat[]> {
    return this.http.get<{ $values: Seat[] }>(`${this.apiUrl}/available`).pipe(
      map((response: { $values: Seat[] }) => response.$values || [])
    );
  }

  // Get seat types
  getSeatTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/types`);
  }

  // Reserve seats
  reserveSeats(seatIds: number[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/reserve`, seatIds);
  }
}

