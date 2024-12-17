import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-history-payment',
  templateUrl: './history-payment.component.html',
  styleUrls: ['./history-payment.component.css']
})
export class HistoryPaymentComponent implements OnInit {
  // Dữ liệu tĩnh
  paymentHistory = [
    {
      customerName: 'Nguyễn Văn A',
      phone: '0123456789',
      email: 'nguyenvana@gmail.com',
      movie: 'Bố Già',
      showDate: '2024-12-19',
      showTime: '12:00 AM',
      seats: 'A1, A2, A3',
      price: 442500,
      paymentMethod: 'OnePay - ATM Nội địa'
    },
    {
      customerName: 'Trần Thị B',
      phone: '0987654321',
      email: 'tranthib@gmail.com',
      movie: 'Avengers',
      showDate: '2024-12-20',
      showTime: '03:00 PM',
      seats: 'B1, B2',
      price: 300000,
      paymentMethod: 'Thanh toán Momo'
    },
    {
      customerName: 'Lê Minh C',
      phone: '0912345678',
      email: 'leminhc@gmail.com',
      movie: 'Spider-Man',
      showDate: '2024-12-21',
      showTime: '06:00 PM',
      seats: 'C1',
      price: 150000,
      paymentMethod: 'Thanh toán ngân hàng'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // Không cần gọi API khi dùng dữ liệu tĩnh
    console.log('Dữ liệu tĩnh đã tải');
  }
}
