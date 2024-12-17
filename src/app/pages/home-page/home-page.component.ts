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
  searchQuery: string = '';
  currentUser: any = null; 
  isLoggedIn: boolean = false; 
  movies: any[] = []; 
  loadingMovies: boolean = true; 
  errorMovies: string | null = null; 

  constructor(
    private movieService: MovieService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inject PLATFORM_ID
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.fetchMovies(); 
  }

  checkLoginStatus(): void {
    if (isPlatformBrowser(this.platformId)) { // Kiểm tra nếu đang ở môi trường trình duyệt
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
        this.loadingMovies = false;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách phim:', err);
        this.errorMovies = 'Không thể tải danh sách phim. Vui lòng thử lại sau.';
        this.loadingMovies = false;
      },
    });
  }

  logout(): void {
    this.currentUser = null; 
    this.isLoggedIn = false; 
    if (isPlatformBrowser(this.platformId)) { // Kiểm tra nếu đang ở môi trường trình duyệt
      localStorage.removeItem('auth_token'); 
      localStorage.removeItem('username'); 
      localStorage.removeItem('role'); 
    }
    this.router.navigate(['/home']);
  }
  
}