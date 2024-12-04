import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Đảm bảo đây là một mảng
})
export class HomeComponent {
  movies: any;
  featuredMovies: any;

  constructor(private router: Router) { }
  nextSlide() {
    throw new Error('Method not implemented.');
  }
  
  prevSlide() {
    throw new Error('Method not implemented.');
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  // Điều hướng đến trang đăng ký
  goToRegister(): void {
    this.router.navigate(['/register']);
  }
  currentSlide: any;
}