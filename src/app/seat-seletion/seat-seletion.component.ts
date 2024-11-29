import { Component, OnInit } from '@angular/core';
import { SeatApiService, Seat } from '../services/api/seat-api.service';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-seletion.component.html',
  styleUrls: ['./seat-seletion.component.css']
})
export class SeatSelectionComponent implements OnInit {
  seats: Seat[] = [];
  selectedSeats: Seat[] = [];
  selectedPromotion: number = 0; // Default promotion discount

  constructor(private seatApiService: SeatApiService) {}

  ngOnInit(): void {
    this.loadAvailableSeats();
  }

  // Load available seats from API
  loadAvailableSeats(): void {
    this.seatApiService.getAvailableSeats().subscribe(
      (data: Seat[]) => {
        this.seats = data.map(seat => ({
          ...seat,
          isSelected: false // Add isSelected property for UI interaction
        }));
      },
      error => {
        console.error('Không thể tải danh sách ghế:', error);
      }
    );
  }

  // Toggle seat selection
  toggleSeat(seat: Seat): void {
    seat.isSelected = !seat.isSelected;
    this.updateSelectedSeats();
  }

  // Update selected seats array
  private updateSelectedSeats(): void {
    this.selectedSeats = this.seats.filter(seat => seat.isSelected);
  }

  // Get selected seats as a string
  get selectedSeatsString(): string {
    return this.selectedSeats
      .map(seat => `${seat.rowNumber}-${seat.seatNumber}`)
      .join(', ');
  }

  // Calculate total seat price
  get totalSeatPrice(): number {
    return this.selectedSeats.reduce((total, seat) => total + seat.price, 0);
  }

  // Calculate discount amount
  get discountAmount(): number {
    return this.totalSeatPrice * this.selectedPromotion;
  }

  // Calculate total amount after discount
  get totalAmount(): number {
    return this.totalSeatPrice - this.discountAmount;
  }

  // Checkout process
  checkout(): void {
    if (this.selectedSeats.length === 0) {
      alert('Vui lòng chọn ít nhất một ghế để thanh toán.');
      return;
    }

    const seatIds = this.selectedSeats.map(seat => seat.id);

    this.seatApiService.reserveSeats(seatIds).subscribe(
      () => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(this.totalAmount);

        alert(`Thanh toán thành công!\nGhế đã chọn: ${this.selectedSeatsString}\nTổng giá: ${formattedPrice}`);

        // Reset seat selection
        this.seats.forEach(seat => (seat.isSelected = false));
        this.selectedSeats = [];
      },
      error => {
        console.error('Lỗi khi đặt ghế:', error);
        alert('Đặt ghế không thành công. Vui lòng thử lại.');
      }
    );
  }
}