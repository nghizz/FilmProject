import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeatApiService } from '../../services/api/seat-api.service';
import { Seat } from '../../models/seat.model';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-seletion.component.html',
  styleUrls: ['./seat-seletion.component.css']
})
export class SeatSelectionComponent implements OnInit {
  seats: Seat[] = []; // Danh sách ghế từ API
  groupedSeats: Seat[][] = []; // Danh sách ghế được nhóm theo hàng
  selectedSeats: Seat[] = []; // Các ghế đã chọn
  selectedPromotion: number = 0; // Tỷ lệ khuyến mãi (mặc định không có khuyến mãi)

  // Các thông tin nhận từ query parameters
  theaterName: string = '';
  movieName: string = '';
  date: string = '';
  showtime: string = '';

  constructor(
    private seatApiService: SeatApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Lấy thông tin từ query parameters
    this.route.queryParams.subscribe((params) => {
      this.movieName = params['movieName'] || 'Tên Phim';
      this.date = params['date'] || ''; // Nhận ngày từ query params
      this.showtime = params['showtime'] || ''; // Nhận giờ chiếu
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
        this.seats = data.map((seat) => ({
          ...seat,
          isSelected: false
        }));

        // Nhóm ghế theo hàng
        this.groupSeatsByRow();
      },
      (error) => {
        console.error('Không thể tải danh sách ghế:', error);
      }
    );
  }

  /**
   * Nhóm ghế theo hàng (rowNumber)
   */
  private groupSeatsByRow(): void {
    const grouped = this.seats.reduce((acc, seat) => {
      acc[seat.rowNumber] = acc[seat.rowNumber] || [];
      acc[seat.rowNumber].push(seat);
      return acc;
    }, {} as { [key: string]: Seat[] });

    this.groupedSeats = Object.values(grouped);
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
    this.selectedSeats = this.seats.filter((seat) => seat.isSelected);
  }

  /**
   * Chuỗi ghế đã chọn (hiển thị cho người dùng)
   */
  get selectedSeatsString(): string {
    return this.selectedSeats
      .map((seat) => `${seat.rowNumber}-${seat.seatNumber}`) // Ví dụ: "A-1, A-2"
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
   * Tính tổng tiền sau khi áp dung khuyến mãi
   */
  get totalAmount(): number {
    return this.totalSeatPrice - this.discountAmount;
  }

  /**
   * Xử lý thanh toán
   */
  out(): void {
    alert('Đã hủy!');
    window.history.back();
  }

  checkout(): void {
    if (this.selectedSeats.length === 0) {
      alert('Vui lòng chọn ít nhất một ghế để thanh toán.');
      return;
    }

    const seatNumbers = this.selectedSeats
      .map((seat) => `${seat.rowNumber}-${seat.seatNumber}`)
      .join(', '); // Chuỗi định dạng cho số ghế đã chọn

    this.router.navigate(['/payment'], {
      queryParams: {
        movieName: this.movieName,
        date: this.date, // Truyền ngày từ query parameters
        showtime: this.showtime, // Truyền giờ chiếu
        seatNumber: seatNumbers,
        totalAmount: this.totalAmount // Truyền tổng số tiền
      }
    });
  }
}