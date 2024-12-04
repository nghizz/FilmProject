import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/api/movie.service'; // Import MovieService
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-film',
  templateUrl: './search-film.component.html',
  styleUrls: ['./search-film.component.css']
})
export class SearchFilmComponent implements OnInit {
  currentUser: any = null;
  isLoggedIn: boolean = false;
  searchKeyword: string = ''; // Từ khóa tìm kiếm
  searchResults: any[] = []; // Kết quả tìm kiếm
  errorSearch: string | null = null; // Lỗi khi tìm kiếm
  loadingSearch: boolean = false; // Trạng thái đang tải kết quả tìm kiếm

  constructor(
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSearch(): void {
    if (!this.searchKeyword.trim()) {
      this.errorSearch = 'Vui lòng nhập từ khóa để tìm kiếm.';
      return;
    }

    this.loadingSearch = true;
    this.errorSearch = null;

    this.movieService.searchMovies(this.searchKeyword).subscribe({
      next: (data) => {
        this.searchResults = data; // Lấy dữ liệu từ MovieService
        if (this.searchResults.length === 0) {
          this.errorSearch = 'Không tìm thấy phim nào.';
        }
        this.loadingSearch = false;
      },
      error: (error) => {
        this.errorSearch = 'Không thể tìm kiếm phim. Vui lòng thử lại sau.';
        this.loadingSearch = false;
        console.error(error);
      }
    });
  }

  logout() {
    this.currentUser = null; // Xóa thông tin người dùng
    this.isLoggedIn = false; // Đặt trạng thái đăng nhập thành false
    localStorage.removeItem('currentUser'); // Xóa dữ liệu người dùng trong localStorage (nếu có)
    this.router.navigate(['/login']); // Điều hướng đến trang đăng nhập
  }
}