import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Kiểm tra trạng thái đăng nhập khi component được khởi tạo
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('auth_token');
      const storedUsername = localStorage.getItem('username');
      if (token && storedUsername) {
        this.isLoggedIn = true;
        this.username = storedUsername;
      }
    }
  }

  logout(): void {
    // Xóa dữ liệu đăng nhập và chuyển hướng tới trang đăng nhập
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('username');
    }
    this.isLoggedIn = false;
    this.username = '';
    this.router.navigate(['/login']);
  }
}