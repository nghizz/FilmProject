import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MovieService } from '../../services/api/movie.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  searchKeyword: string = ''; // Biến lưu từ khóa tìm kiếm
  currentUser: any = null;
  isLoggedIn: boolean = false;
  movies: any[] = []; // Danh sách phim đầy đủ
  searchResults: any[] = []; // Kết quả tìm kiếm phim
  loading: boolean = false; // Trạng thái loading chung
  error: string | null = null; // Biến lưu lỗi chung

  constructor(
    private movieService: MovieService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.fetchMovies(); // Load danh sách phim lúc đầu
  }

  checkLoginStatus(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('auth_token');
      if (storedUser) {
        this.isLoggedIn = true;
        this.currentUser = {
          username: localStorage.getItem('username'),
          role: localStorage.getItem('role'),
        };
      } else {
        this.isLoggedIn = false;
        alert('Bạn đã đăng xuất trước đó! Vui lòng đăng nhập lại!');
        this.router.navigate(['/home']);
      }
    }
  }

  // Hàm lấy danh sách tất cả các phim
  fetchMovies(): void {
    this.loading = true;
    this.error = null;

    this.movieService.getAllMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.searchResults = data; // Hiển thị danh sách phim mặc định
        this.loading = false;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách phim:', err);
        this.error = 'Không thể tải danh sách phim. Vui lòng thử lại sau.';
        this.loading = false;
      },
    });
  }

  // Hàm tìm kiếm phim
  onSearch(): void {
    if (!this.searchKeyword.trim()) {
      // Nếu từ khóa rỗng -> Hiển thị lại danh sách phim đầy đủ
      this.searchResults = this.movies;
      this.error = null;
      return;
    }

    // Nếu có từ khóa -> Tìm kiếm phim
    this.loading = true;
    this.error = null;

    this.movieService.searchMovies(this.searchKeyword).subscribe({
      next: (data) => {
        this.searchResults = data;
        if (this.searchResults.length === 0) {
          this.error = 'Không tìm thấy phim nào.';
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Không thể tìm kiếm phim. Vui lòng thử lại sau.';
        console.error(error);
        this.loading = false;
      },
    });
  }

  logout(): void {
    this.currentUser = null;
    this.isLoggedIn = false;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
    }
    this.router.navigate(['/home']);
  }
}
