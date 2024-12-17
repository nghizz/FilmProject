import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MovieService } from '../../services/api/movie.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; 

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  searchKeyword: string = ''; // Khai báo searchKeyword
  currentUser: any = null; 
  isLoggedIn: boolean = false; 
  movies: any[] = []; // Mảng phim ban đầu
  searchResults: any[] = []; // Mảng kết quả tìm kiếm
  loadingMovies: boolean = true; 
  errorMovies: string | null = null; 
  loadingSearch: boolean = false;
  errorSearch: string | null = null;

  constructor(
    private movieService: MovieService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.fetchMovies(); 
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
        this.router.navigate(['/home']);
      }
    }
  }

  fetchMovies(): void {
    this.loadingMovies = true;
    this.errorMovies = null;

    this.movieService.getAllMovies().subscribe({
      next: (data) => {
        this.movies = data;
        this.searchResults = [...data]; // Mặc định hiển thị tất cả phim
        this.loadingMovies = false;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách phim:', err);
        this.errorMovies = 'Không thể tải danh sách phim. Vui lòng thử lại sau.';
        this.loadingMovies = false;
      },
    });
  }

  onSearch(): void {
    if (!this.searchKeyword.trim()) {
      this.searchResults = [...this.movies]; // Hiển thị lại tất cả phim khi không có từ khóa
      return;
    }

    this.loadingSearch = true;
    this.errorSearch = null;
    this.searchResults = this.movies.filter(movie =>
      movie.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
      movie.genre.toLowerCase().includes(this.searchKeyword.toLowerCase())
    );

    if (this.searchResults.length === 0) {
      this.errorSearch = 'Không tìm thấy phim nào.';
    }

    this.loadingSearch = false;
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
