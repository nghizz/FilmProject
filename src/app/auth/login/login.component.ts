import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../../services/api/auth-api.service';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser
import { Inject, PLATFORM_ID } from '@angular/core'; // Import PLATFORM_ID

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = { username: '', password: '' };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private authApiService: AuthApiService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) { }

  ngOnInit(): void {
    // Kiểm tra nếu đã đăng nhập rồi thì chuyển tới trang homepage
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('auth_token')) {
      this.router.navigate(['/homepage']); // Điều hướng nếu đã đăng nhập
    }
  }

  onSubmit(): void {
    if (!this.credentials.username || !this.credentials.password) {
      this.errorMessage = 'Vui lòng nhập username và password.';
      return;
    }

    this.authApiService.login(this.credentials).subscribe(
      (response) => {
        if (response && response.message === 'Đăng nhập thành công') {
          this.successMessage = response.message;
          this.errorMessage = '';

          // Lưu thông tin đăng nhập vào localStorage nếu đang ở môi trường trình duyệt
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('auth_token', response.token); // Lưu token
            localStorage.setItem('username', response.user.username); // Lưu tên người dùng
            localStorage.setItem('role', response.user.role); // Lưu chức vụ người dùng
          }

          this.router.navigate(['/home']); // Điều hướng đến trang homepage sau khi đăng nhập thành công
        }
      },
      (error) => {
        // Xử lý lỗi chi tiết từ backend
        switch (error.status) {
          case 401:
            this.errorMessage = error.error.message || 'Tài khoản hoặc mật khẩu không chính xác.';
            break;
          case 404:
            this.errorMessage = 'Không tìm thấy tài khoản này.';
            break;
          default:
            this.errorMessage = 'Có lỗi xảy ra. Vui lòng thử lại.';
        }
        this.successMessage = '';
      }
    );
  }
}
