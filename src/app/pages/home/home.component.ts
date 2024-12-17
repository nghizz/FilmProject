import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; 
import { Inject, PLATFORM_ID } from '@angular/core'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any = null; 
  isLoggedIn: boolean = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  // Kiểm tra trạng thái đăng nhập
  checkLoginStatus(): void {
    if (isPlatformBrowser(this.platformId)) { // Kiểm tra nếu đang ở môi trường trình duyệt
      const storedUser = localStorage.getItem('auth_token');
      if (storedUser) {
        this.isLoggedIn = true;
        this.currentUser = {
          username: localStorage.getItem('username'),
          role: localStorage.getItem('role'),
        };
      } else {
        this.isLoggedIn = false;
      }
    }
  }

  // Điều hướng đến trang đăng nhập
  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Điều hướng đến trang đăng ký
  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  // Điều hướng đến trang Lịch Chiếu
  goToHomePage(): void {
    this.router.navigate(['/homepage']);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) { // Kiểm tra nếu đang ở môi trường trình duyệt
      localStorage.removeItem('auth_token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
    }
    this.router.navigate(['/home']);
  }
}
