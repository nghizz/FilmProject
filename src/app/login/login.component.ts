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
    if (!this.credentials.username || !this.credentials.password) {
        this.errorMessage = 'Vui lòng nhập username và password.';
        return;
    }
  
    this.authApiService.login(this.credentials).subscribe(
        (response) => {
            if (response && response.message === 'Đăng nhập thành công') {
                this.successMessage = response.message;
                this.errorMessage = '';
                localStorage.setItem('auth_token', response.token); // Lưu token
                localStorage.setItem('username', response.user.username); // Lưu tên người dùng
                localStorage.setItem('role',response.user.role); // Lưu chức vụ người dùng
                this.router.navigate(['/homepage']); // Điều hướng
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