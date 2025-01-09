import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/api/order.service';   // Import service để gọi API
import { Payment } from '../../models/payment.model';
import { SharedDataService } from '../../services/api/sharedData.service';
import moment from 'moment-timezone';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  customerName: string = '';
  phoneNumber: string = '';
  email: string = '';
  movieName: string = '';
  showtime: string = ''; // Giờ chiếu (định dạng hiển thị)
  seatNumber: string = '';
  totalAmount: number = 0;
  dateOrder: string = ''; // Ngày đặt (order_date)
  showtimeId: number = 0; // Showtime ID
  movieId: number = 0;

  paymentMethod: string = 'onepay';
  customerId: number = 0; // Gán giá trị mặc định là 0

  constructor(private route: ActivatedRoute, private orderService: OrderService,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.movieName = params['movieName'] || 'Tên Phim';
      this.dateOrder = params['date'] || '';
      this.movieId = +params['movieId'] || 0;  // Đảm bảo lấy đúng giá trị movieId

      if (this.movieId === 0) {
        alert('ID phim không hợp lệ!');  // Kiểm tra nếu movieId không hợp lệ
      }

      const fullShowtime = params['showtime'] || '';
      const showtimeDate = new Date(fullShowtime);
      this.showtime = showtimeDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

      this.seatNumber = params['seatNumber'] || '';
      this.totalAmount = +params['totalAmount'] || 0;
      this.showtimeId = +params['showtimeId'] || 0;

      // Kiểm tra customerId
      this.customerId = this.sharedDataService.getCustomerId() ?? 0;
      this.customerName = this.sharedDataService.getCustomerName() ?? '';

      if (this.customerId === 0) {
        alert('Không tìm thấy thông tin khách hàng!');
      } else {
        console.log('Customer ID:', this.customerId);
      }
    });
  }



  // Xử lý khi nhấn nút "Hủy bỏ"
  onCancel(): void {
    alert('Đã hủy thanh toán!');
    window.history.back(); // Quay trở lại trang trước
  }

  // Kiểm tra tính hợp lệ của form
  isFormValid(): boolean {
    if (!this.customerName.trim()) {
      alert('Họ và tên không được để trống!');
      return false;
    }
    return true; // Form hợp lệ
  }

  // Xử lý khi nhấn nút "Xác nhận"
  onConfirm(): void {
    if (this.movieId === 0) {
      alert('ID phim không hợp lệ!');
      return;
    }
  
    const dateOrderUTC = moment(this.dateOrder).tz('UTC').toDate();  // Chuyển string thành đối tượng Date
  
    if (this.isFormValid()) {
      const paymentDto: Payment = {
        showtimeId: this.showtimeId,            // Showtime ID
        customerId: this.customerId,            // Customer ID
        movieId: this.movieId,                  // Movie ID
        dateOrder: dateOrderUTC,                // Chuyển đổi thành Date
        showtime: this.showtime,                // Giờ chiếu
        seatNumbers: this.seatNumber.split(',').map(seat => seat.trim()).join(', '),  // Ghế ngồi
        totalAmount: this.totalAmount,          // Tổng tiền
        paymentMethod: this.paymentMethod,      // Phương thức thanh toán
        paymentStatus: 'Pending',              // Trạng thái thanh toán
        promotionId: 1                         // Mã khuyến mãi, có thể lấy từ tham số nếu cần
      };
  
      console.log('Payment DTO gửi đi:', paymentDto);
      this.orderService.createOrder(paymentDto).subscribe(
        (response) => {
          alert('Thanh toán thành công! Đơn hàng đã được tạo.');
          // Chuyển hướng người dùng đến trang lịch sử đơn hàng hoặc trang khác nếu cần
        },
        (error) => {
          alert('Có lỗi xảy ra khi thanh toán.');
          console.error(error);  // In ra lỗi để debug
        }
      );
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
