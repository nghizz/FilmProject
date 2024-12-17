import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileComponent {
  // Dữ liệu lịch sử giao dịch
  constructor (private router: Router){}
  transactionHistory = [
    {
      tenPhim: 'Bố Già',
      ngayChieu: '2024-12-19',
      xuatChieu: '12:00 AM',
      soGhe: '1-3',
      tongTien: '442,500 VND',
      hinhThucThanhToan: 'OnePay - ATM Nội địa'
    },
    {
      tenPhim: 'Avengers: Endgame',
      ngayChieu: '2024-12-21',
      xuatChieu: '03:00 PM',
      soGhe: '5-7',
      tongTien: '500,000 VND',
      hinhThucThanhToan: 'Thanh toán Momo'
    }
  ];
  // Quay lại trang chính
  goToHomePage() {
    this.router.navigate(['/homepage']);
  }
}
