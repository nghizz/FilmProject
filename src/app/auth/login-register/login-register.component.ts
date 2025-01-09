
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from '../../services/api/auth-api.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent {
  isRegistering: boolean = false;

  // Thông tin cho đăng nhập
  credentials = { username: '', password: '' };

  // Thông tin cho đăng ký
  registerCredentials = { fullName: '', password: '', rePassword: '' };

  constructor(private authService: AuthApiService, private router: Router) {}

  toggleRegister() {
    this.isRegistering = !this.isRegistering;
  }

  // Phương thức xử lý đăng nhập
  login() {
    if (!this.credentials.username || !this.credentials.password) {
      alert('Vui lòng nhập tất cả thông tin.');
      return;
    }

    this.authService.login(this.credentials).subscribe(
      (response) => {
        if (response && response.message === 'Đăng nhập thành công') {
          // Lưu thông tin đăng nhập vào localStorage hoặc xử lý khác
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('username', response.user.username);
          localStorage.setItem('role', response.user.role);
          localStorage.setItem('customerId', response.user.id);

          // Điều hướng đến trang home sau khi đăng nhập thành công
          this.router.navigate(['/homepage']);
        }
      },
      (error) => {
        console.error('Đăng nhập thất bại:', error);
        alert(error.error.message || 'Tài khoản hoặc mật khẩu không chính xác.');
      }
    );
  }

  // Phương thức xử lý đăng ký
  register() {
    // Kiểm tra xem tất cả các trường đều đã được nhập
    if (!this.registerCredentials.fullName || 
        !this.registerCredentials.password || 
        !this.registerCredentials.rePassword) {
      alert('Vui lòng nhập tất cả thông tin.');
      return;
    }

    // So sánh password với confirmPassword
    if (this.registerCredentials.password !== this.registerCredentials.rePassword) {
      alert('Mật khẩu không khớp. Vui lòng thử lại.');
      return;
    }

    // Gọi API đăng ký nếu tất cả các trường hợp đều hợp lệ
    const userDetails = {
      username: this.registerCredentials.fullName, // Dùng fullName làm username
      password: this.registerCredentials.password,
    };

    this.authService.register(userDetails).subscribe(
      (response) => {
        console.log('Đăng ký thành công:', response);
        //this.router.navigate(['/']);  // Chuyển hướng sang trang đăng nhập
      },
      (error) => {
        console.error('Đăng ký thất bại:', error);
        alert('Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại.');
      }
    );
}

  // Phương thức xử lý quên mật khẩu
  forgotPassword() {
    // Logic để xử lý quên mật khẩu (có thể hiển thị một modal hoặc điều hướng đến trang quên mật khẩu)
    alert('Chưa triển khai tính năng này!');
  }
}
