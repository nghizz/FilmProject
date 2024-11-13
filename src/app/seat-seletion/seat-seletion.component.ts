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

  get selectedSeats(): Seat[] {
    return this.seats.filter(seat => seat.isSelected);
  }

  get selectedSeatsString(): string {
    return this.selectedSeats.map(seat => seat.name).join(', ');
  }

  get totalPrice(): number {
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

  toggleSeat(seat: Seat): void {
    // Toggle the selection of the seat
    seat.isSelected = !seat.isSelected;
  }

  checkout(): void {
    const selectedSeatsString = this.selectedSeatsString;
    const totalPrice = this.totalPrice;
  
    // Kiểm tra xem người dùng đã chọn ghế và tổng giá có hợp lệ không
    if (selectedSeatsString && totalPrice > 0) {
      // Giả lập hành động thanh toán
      console.log('Đang xử lý thanh toán...');
  
      // Định dạng tổng giá thành tiền VND
      const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(totalPrice);
  
      // Sau khi thanh toán thành công, hiển thị thông báo
      alert(`Thanh toán thành công!\nGhế đã chọn: ${selectedSeatsString}\nTổng giá: ${formattedPrice}`);
  
      // Sau khi thanh toán, xóa thông tin ghế đã chọn
      this.seats.forEach(seat => seat.isSelected = false);
      
      // Làm mới lại thông tin ghế đã chọn và tổng giá
      console.log('Ghế đã chọn:', []);
      console.log('Tổng giá:', 0);
    } else {
      // Nếu chưa chọn ghế, yêu cầu người dùng chọn ghế
      alert('Vui lòng chọn ghế trước khi thanh toán!');
    }
  }
  
}
