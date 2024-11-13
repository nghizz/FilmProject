import { Component } from '@angular/core';

interface Seat {
  name: string;
  type: 'regular' | 'double' | 'vip';
  isSelected: boolean;
}
@Component({
  selector: 'app-seat-seletion',
  templateUrl: './seat-seletion.component.html',
  styleUrl: './seat-seletion.component.css'
})
export class SeatSelectionComponent {
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

  popcornQuantity: number = 0;
  drinkQuantity: number = 0;

  get selectedSeats(): Seat[] {
    return this.seats.filter(seat => seat.isSelected);
  }

  get selectedSeatsString(): string {
    return this.selectedSeats.map(seat => seat.name).join(', ');
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
          return acc;
      }
    }, 0);
  }

  get totalServicePrice(): number {
    return (this.popcornQuantity * this.popcornPrice) + (this.drinkQuantity * this.drinkPrice);
  }

  get totalAmount(): number {
    return this.totalSeatPrice + this.totalServicePrice;
  }

  toggleSeat(seat: Seat): void {
    seat.isSelected = !seat.isSelected;
  }
  

  checkout(): void {
    const selectedSeatsString = this.selectedSeatsString;
    const totalPrice = this.totalAmount;

    if (selectedSeatsString && totalPrice > 0) {
      const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(totalPrice);

      alert(`Thanh toán thành công!\nGhế đã chọn: ${selectedSeatsString}\nTổng giá: ${formattedPrice}`);
      this.seats.forEach(seat => seat.isSelected = false);
      this.popcornQuantity = 0;
      this.drinkQuantity = 0;
    } else {
      alert('Vui lòng chọn ghế và dịch vụ trước khi thanh toán!');
    }
  }
}
