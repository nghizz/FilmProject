import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeatApiService, Seat } from '../services/api/seat-api.service';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-seletion.component.html',
  styleUrls: ['./seat-seletion.component.css']
})
export class SeatSelectionComponent implements OnInit {
  seats: Seat[] = []; // Danh sách ghế từ API
  selectedSeats: Seat[] = []; // Các ghế đã chọn
  selectedPromotion: number = 0; // Tỷ lệ khuyến mãi (mặc định không có khuyến mãi)

  // Các thông tin nhận từ query parameters
  theaterName: string = '';
  movieName: string = '';
  date: string = '';
  showtime: string = '';

  constructor(private seatApiService: SeatApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Lấy thông tin từ query parameters
    this.route.queryParams.subscribe(params => {
      this.theaterName = params['theaterName'] || 'Tên Rạp';
      this.movieName = params['movieName'] || 'Tên Phim';
      this.date = params['date'] || '';
      this.showtime = params['showtime'] || '';
    });

    // Load danh sách ghế
    this.loadAvailableSeats();
  }

  /**
   * Tải danh sách ghế từ API
   */
  loadAvailableSeats(): void {
    this.seatApiService.getAvailableSeats().subscribe(
      (data: Seat[]) => {
        // Thêm thuộc tính `isSelected` để theo dõi trạng thái chọn ghế
        this.seats = data.map(seat => ({
          ...seat,
          isSelected: false
        }));
      },
      error => {
        console.error('Không thể tải danh sách ghế:', error);
      }
    );
  }

  /**
   * Xử lý chọn/bỏ chọn ghế
   * @param seat Ghế được nhấn
   */
  toggleSeat(seat: Seat): void {
    seat.isSelected = !seat.isSelected; // Đổi trạng thái ghế
    this.updateSelectedSeats(); // Cập nhật danh sách ghế đã chọn
  }

  /**
   * Cập nhật danh sách ghế đã chọn
   */
  private updateSelectedSeats(): void {
    this.selectedSeats = this.seats.filter(seat => seat.isSelected);
  }

  /**
   * Chuỗi ghế đã chọn (hiển thị cho người dùng)
   */
  get selectedSeatsString(): string {
    return this.selectedSeats
      .map(seat => `${seat.rowNumber}-${seat.seatNumber}`) // Ví dụ: "A-1, A-2"
      .join(', ');
  }

  /**
   * Tính tổng giá vé của các ghế đã chọn
   */
  get totalSeatPrice(): number {
    return this.selectedSeats.reduce((total, seat) => total + seat.price, 0);
  }

  /**
   * Tính số tiền giảm giá dựa trên khuyến mãi
   */
  get discountAmount(): number {
    return this.totalSeatPrice * this.selectedPromotion;
  }

  /**
   * Tính tổng tiền sau khi áp dụng khuyến mãi
   */
  get totalAmount(): number {
    return this.totalSeatPrice - this.discountAmount;
  }

  /**
   * Xử lý thanh toán
   */
  checkout(): void {if (this.selectedSeats.length === 0) {
    alert('Vui lòng chọn ít nhất một ghế để thanh toán.');
    return;
  }

  const seatNumbers = this.selectedSeats.map(seat => `${seat.rowNumber}-${seat.seatNumber}`).join(', ');
  const totalAmount = this.totalAmount;

  this.router.navigate(['/payment'], {
    queryParams: {
      theaterName: this.theaterName,
      movieName: this.movieName,
      date: this.date,
      showtime: this.showtime,
      seatNumber: seatNumbers,
      totalAmount: totalAmount,
    },
  });
}
}