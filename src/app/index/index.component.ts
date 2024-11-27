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
  role: string | null = ''; // Thêm biến để lưu role
  isDropdownOpen: boolean = false; // Thêm biến để quản lý trạng thái dropdown

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Kiểm tra trạng thái đăng nhập khi component được khởi tạo
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('auth_token');
      const storedUsername = localStorage.getItem('username');
      const storedRole = localStorage.getItem('role'); // Lấy role từ local storage
      if (token && storedUsername) {
        this.isLoggedIn = true;
        this.username = storedUsername;
        this.role = storedRole || ''; // Gán giá trị cho role
      }
    }
  }

  logout(): void {
    // Đăng xuất
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
    }
    this.isLoggedIn = false;
    this.username = '';
    this.role = ''; // Reset role khi đăng xuất
    this.router.navigate(['/login']);
  }
}