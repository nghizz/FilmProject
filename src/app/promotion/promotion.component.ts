import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PromotionService } from '../services/api/promotion.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrl: './promotion.component.css'
})
export class PromotionComponent {
  currentUser: any = null; // Lưu thông tin người dùng
  isLoggedIn: boolean = false; // Kiểm tra trạng thái đăng nhập


  constructor(
    private promotionService: PromotionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.fetchCurrentUser(); // Gọi API lấy thông tin người dùng
  }

  // // Lấy thông tin người dùng từ API
  // fetchCurrentUser() {
  //   this.http.get<any>('https://localhost:44374/api/Users').subscribe({
  //     next: (data) => {
  //       this.currentUser = data; // Gán dữ liệu người dùng
  //     },
  //     error: (err) => {
  //       console.error('Lỗi khi lấy thông tin người dùng:', err);
  //     },
  //     complete: () => {
  //       console.log('Hoàn thành việc lấy thông tin người dùng.');
  //       }
  //   });
  // }

  logout() {
    this.currentUser = null; // Xóa thông tin người dùng
    this.isLoggedIn = false; // Đặt trạng thái đăng nhập thành false
    localStorage.removeItem('currentUser'); // Xóa dữ liệu người dùng trong localStorage (nếu có)
    this.router.navigate(['/login']); // Điều hướng đến trang đăng nhập
  }
}

