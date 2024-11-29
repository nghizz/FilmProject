import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface Seat {
  name: string;
  type: 'regular' | 'double' | 'vip';
  isSelected: boolean;
}

@Component({
  selector: 'app-seat-seletion',
  templateUrl: './seat-seletion.component.html',
  styleUrls: ['./seat-seletion.component.css'],
})
export class SeatSelectionComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  seats: Seat[] = [
    { name: 'Ghế 01', type: 'double', isSelected: false },
    { name: 'Ghế 02', type: 'double', isSelected: false },
    { name: 'Ghế 03', type: 'regular', isSelected: false },
    { name: 'Ghế 04', type: 'regular', isSelected: false },
    { name: 'Ghế 05', type: 'regular', isSelected: false },
    { name: 'Ghế 06', type: 'double', isSelected: false },
    { name: 'Ghế 07', type: 'double', isSelected: false },
    { name: 'Ghế 08', type: 'regular', isSelected: false },
    { name: 'Ghế 09', type: 'regular', isSelected: false },
    { name: 'Ghế 10', type: 'regular', isSelected: false },
    { name: 'Ghế 11', type: 'double', isSelected: false },
    { name: 'Ghế 12', type: 'double', isSelected: false },
    { name: 'Ghế 13', type: 'regular', isSelected: false },
    { name: 'Ghế 14', type: 'regular', isSelected: false },
    { name: 'Ghế 15', type: 'regular', isSelected: false },
    { name: 'Ghế 16', type: 'double', isSelected: false },
    { name: 'Ghế 17', type: 'double', isSelected: false },
    { name: 'Ghế 18', type: 'regular', isSelected: false },
    { name: 'Ghế 19', type: 'regular', isSelected: false },
    { name: 'Ghế 20', type: 'regular', isSelected: false },
    { name: 'Ghế 21', type: 'double', isSelected: false },
    { name: 'Ghế 22', type: 'double', isSelected: false },
    { name: 'Ghế 23', type: 'regular', isSelected: false },
    { name: 'Ghế 24', type: 'regular', isSelected: false },
    { name: 'Ghế 25', type: 'regular', isSelected: false },
    { name: 'Ghế 26', type: 'vip', isSelected: false },
    { name: 'Ghế 27', type: 'vip', isSelected: false },
    { name: 'Ghế 28', type: 'vip', isSelected: false },
    { name: 'Ghế 29', type: 'vip', isSelected: false },
    { name: 'Ghế 30', type: 'vip', isSelected: false },
    { name: 'Ghế 31', type: 'vip', isSelected: false },
    { name: 'Ghế 32', type: 'vip', isSelected: false },
    { name: 'Ghế 33', type: 'vip', isSelected: false },
    { name: 'Ghế 34', type: 'vip', isSelected: false },
    { name: 'Ghế 35', type: 'vip', isSelected: false }
  ];

  regularPrice: number = 200000;
  doublePrice: number = 400000;
  vipPrice: number = 600000;
  popcornPrice: number = 50000;
  drinkPrice: number = 30000;
  selectedPromotion: number = 0; // Mặc định không có khuyến mãi

  popcornQuantity: number = 0;
  drinkQuantity: number = 0;

  theaterName: string = '';
  movieName: string = '';
  showTime: string = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.theaterName = params['theaterName'] || 'Tên Rạp';
      this.movieName = params['movieName'] || 'Tên Phim';

      // Lấy showtime từ paramMap
      this.route.paramMap.subscribe(paramMap => {
        this.showTime = paramMap.get('showtime') || '16:00'; // Đảm bảo lấy chính xác showtime
      });
    });
  }

  get selectedSeats(): Seat[] {
    return this.seats.filter((seat) => seat.isSelected);
  }

  get selectedSeatsString(): string {
    return this.selectedSeats.map((seat) => seat.name).join(', ');
  }

  get totalSeatPrice(): number {
    return this.selectedSeats.reduce((acc, seat) => {
      switch (seat.type) {
        case 'regular':
          return acc + this.regularPrice;
        case 'double':
          return acc + this.doublePrice;
        case 'vip':
          return acc + this.vipPrice;
        default:
          return acc; // Trả về giá trị hiện tại nếu không khớp loại
      }
    }, 0);
  }

  get totalServicePrice(): number {
    return this.popcornQuantity * this.popcornPrice + this.drinkQuantity * this.drinkPrice;
  }

  get discountAmount(): number {
    return (this.totalSeatPrice + this.totalServicePrice) * this.selectedPromotion;
  }

  get totalAmount(): number {
    return this.totalSeatPrice + this.totalServicePrice - this.discountAmount;
  }

  toggleSeat(seat: Seat): void {
    seat.isSelected = !seat.isSelected; // Chuyển trạng thái ghế được chọn
  }

  checkout(): void {
    const selectedSeatsString = this.selectedSeatsString;
    const totalPrice = this.totalAmount;

    if (selectedSeatsString && totalPrice > 0) {
      this.router.navigate(['/payment'], {
        queryParams: {
          theaterName: this.theaterName,
          movieName: this.movieName,
          showTime: this.showTime,
          seatNumber: selectedSeatsString,
          totalAmount: totalPrice,
        },
      });
    } else {
      alert('Vui lòng chọn ghế và dịch vụ trước khi thanh toán!');
    }
  }
}