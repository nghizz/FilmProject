import { Component } from '@angular/core';
import { AuthApiService } from '../../services/api/auth-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthApiService, private router: Router) { }

  onSubmit(): void {
    const userDetails = {
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.authService.register(userDetails).subscribe(
      response => {
        console.log('Đăng ký thành công:', response);
        this.router.navigate(['/login']);  // Chuyển hướng sang trang đăng nhập
      },
      error => {
        console.error('Đăng ký thất bại:', error);
      }
    );
  }
}