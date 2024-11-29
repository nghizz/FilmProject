import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/api/movie.service'; // Import MovieService
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  currentUser: any = null;
  isLoggedIn: boolean = false;
  movies: any[] = []; // Danh sách phim
  loadingMovies: boolean = true; // Trạng thái đang tải
  errorMovies: string | null = null; // Lỗi nếu có

  constructor(
    private movieService: MovieService, // Inject MovieService
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.fetchMovies(); // Lấy danh sách phim khi component được khởi tạo
  }

  // Lấy danh sách tất cả phim từ API
  fetchMovies(): void {
    this.loadingMovies = true;
    this.errorMovies = null;

    this.movieService.getAllMovies().subscribe({
      next: (data) => {
        this.movies = data; // Gán dữ liệu vào biến movies
        this.loadingMovies = false;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách phim:', err);
        this.errorMovies = 'Không thể tải danh sách phim. Vui lòng thử lại sau.';
        this.loadingMovies = false;
      },
    });
  }

  logout() {
    this.currentUser = null; // Xóa thông tin người dùng
    this.isLoggedIn = false; // Đặt trạng thái đăng nhập thành false
    localStorage.removeItem('currentUser'); // Xóa dữ liệu người dùng trong localStorage (nếu có)
    this.router.navigate(['/login']); // Điều hướng đến trang đăng nhập
  }
}