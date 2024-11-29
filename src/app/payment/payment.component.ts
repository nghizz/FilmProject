import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  customerName: string = '';
  phoneNumber: string = '';
  email: string = '';
  theaterName: string = '';
  movieName: string = '';
  showTime: string = '';
  seatNumber: string = '';
  totalAmount: number = 0;

  paymentMethod: string = 'onepay';  // Mặc định chọn "OnePay"

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.theaterName = params['theaterName'] || 'Tên Rạp';
      this.movieName = params['movieName'] || 'Tên Phim';
      this.showTime = params['showTime'] || '16:00';
      this.seatNumber = params['seatNumber'] || '';
      this.totalAmount = +params['totalAmount'] || 0;  // Convert string to number
    });
  }

  // Xử lý khi nhấn nút "Hủy bỏ"
  onCancel(): void {
    alert('Đã hủy thanh toán!');
    window.history.back();
    // Có thể thêm logic để điều hướng về trang trước
  }

  // Xử lý khi nhấn nút "Xác nhận"
  isFormValid(): boolean {
    // Kiểm tra tính hợp lệ của thông tin thanh toán
    if (!this.customerName.trim()) {
      alert('Họ và tên không được để trống!');
      return false;
    }
    if (!this.phoneNumber.trim() || !/^\d+$/.test(this.phoneNumber)) {
      alert('Số điện thoại không hợp lệ!');
      return false;
    }
    if (!this.email.trim() || !/^\S+@\S+\.\S+$/.test(this.email)) {
      alert('Email không hợp lệ!');
      return false;
    }
    if (!this.theaterName.trim()) {
      alert('Tên rạp không được để trống!');
      return false;
    }
    if (!this.movieName.trim()) {
      alert('Tên phim không được để trống!');
      return false;
    }
    if (!this.showTime.trim()) {
      alert('Xuất chiếu không được để trống!');
      return false;
    }
    if (!this.seatNumber.trim()) {
      alert('Số ghế không được để trống!');
      return false;
    }
    if (this.totalAmount <= 0) {
      alert('Tổng tiền phải lớn hơn 0!');
      return false;
    }
    return true; // Form hợp lệ
  }

  onConfirm(): void {
    if (this.isFormValid()) {
      // Hiển thị thông tin thanh toán
      alert(`Thanh toán thành công!
          Họ và tên: ${this.customerName}
          Số điện thoại: ${this.phoneNumber}
          Email: ${this.email}
          Tên rạp: ${this.theaterName}
          Tên phim: ${this.movieName}
          Xuất chiếu: ${this.showTime}
          Số ghế: ${this.seatNumber}
          Tổng tiền: ${this.totalAmount} VND
          Hình thức: ${this.getPaymentMethodName()}
      `);

      // Thêm logic gọi API hoặc các xử lý khác nếu cần
    }
  }

  // Lấy tên hình thức thanh toán
  getPaymentMethodName(): string {
    switch (this.paymentMethod) {
      case 'onepay':
        return 'OnePay - ATM Nội địa';
      case 'bank':
        return 'Thanh toán ngân hàng';
      case 'momo':
        return 'Thanh toán Momo';
      default:
        return 'Không xác định';
    }
  }
}