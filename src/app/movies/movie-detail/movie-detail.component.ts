import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/api/movie.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/api/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie: any;  // Để chứa thông tin chi tiết của phim
  isLoading: boolean = true;  // Dùng để hiển thị trạng thái loading
  error: string | null = null; // Thuộc tính để lưu trữ lỗi
  movie: any;  // Để chứa thông tin chi tiết của phim
  isLoading: boolean = true;  // Dùng để hiển thị trạng thái loading
  error: string | null = null; // Thuộc tính để lưu trữ lỗi

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,  // Để lấy ID từ URL
    private route: ActivatedRoute,  // Để lấy ID từ URL
    private router: Router
  ) {}
  ) {}

  ngOnInit(): void {
    // Lấy id từ tham số URL
    const movieId = +this.route.snapshot.paramMap.get('id')!; // Giả sử URL có dạng /movie/:id
    this.getMovieById(movieId);
  }

  // Lấy dữ liệu phim theo id
  getMovieById(id: number): void {
    // Lấy id từ tham số URL
    const movieId = +this.route.snapshot.paramMap.get('id')!; // Giả sử URL có dạng /movie/:id
    this.getMovieById(movieId);
  }

  // Lấy dữ liệu phim theo id
  getMovieById(id: number): void {
    this.movieService.getMovieById(id).subscribe({
      next: (movie) => {
        if (movie) {
          this.movie = movie;  // Cập nhật thông tin của phim
          this.isLoading = false;  // Đánh dấu là đã tải xong
          this.error = null;  // Reset lỗi nếu có
        } else {
          this.isLoading = false;
          this.error = 'Không tìm thấy phim';
        }
      next: (movie) => {
        if (movie) {
          this.movie = movie;  // Cập nhật thông tin của phim
          this.isLoading = false;  // Đánh dấu là đã tải xong
          this.error = null;  // Reset lỗi nếu có
        } else {
          this.isLoading = false;
          this.error = 'Không tìm thấy phim';
        }
      },
      error: (err) => {
        console.error('Lỗi khi tải phim:', err);
        this.isLoading = false;  // Đánh dấu tải xong ngay cả khi có lỗi
        this.error = 'Đã xảy ra lỗi, vui lòng thử lại';
        console.error('Lỗi khi tải phim:', err);
        this.isLoading = false;  // Đánh dấu tải xong ngay cả khi có lỗi
        this.error = 'Đã xảy ra lỗi, vui lòng thử lại';
      },
    });
  }  
  }  
  goBack(): void {
    this.router.navigate(['/homepage']);
  }
}