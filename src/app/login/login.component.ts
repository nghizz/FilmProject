import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../services/api/auth-api.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authApiService: AuthApiService, private router: Router) { }

  onSubmit() {
    // Kiểm tra điều kiện nhập username và password
    if (!this.credentials.username || !this.credentials.password) {
        this.errorMessage = 'Vui lòng nhập username và password.';
        return;
    }

    // Gửi yêu cầu đăng nhập đến API
    this.authApiService.login(this.credentials).subscribe(
        (response) => {
            if (response && response.message === 'Đăng nhập thành công') {
                this.successMessage = response.message;
                this.errorMessage = '';
                // Lưu token hoặc thông tin người dùng vào localStorage
                localStorage.setItem('auth_token', response.token);  // Lưu token vào localStorage
                this.router.navigate(['/index']);  // Chuyển hướng đến trang index
            } else {
                this.errorMessage = 'Đăng nhập thất bại. Vui lòng thử lại.';
                this.successMessage = '';
            }
        },
        (error) => {
            console.error('Login failed:', error);
            this.errorMessage = 'Có lỗi xảy ra. Vui lòng thử lại.';
            this.successMessage = '';
        }
    );
  }
}
