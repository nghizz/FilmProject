import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/api/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-films-management',
  templateUrl: './films-management.component.html',
  styleUrls: ['./films-management.component.css']
})
export class FilmsmanagementComponent implements OnInit {
  movies: any[] = [];
  loadingMovies = false;
  errorMovies: string = '';

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loadingMovies = true;
    this.movieService.getAllMovies().subscribe(
      (data) => {
        this.movies = data.map((movie: any) => ({
          ...movie,
          showtimes: Array.isArray(movie.showtimes) ? movie.showtimes : [] // Đảm bảo showtimes là mảng
        }));
        this.loadingMovies = false;
      },
      (error) => {
        this.errorMovies = 'Không thể tải danh sách phim';
        this.loadingMovies = false;
      }
    );
  }

  // Thêm phim mới
  addMovie(): void {
    const newMovie = {
      id: 5,
      name: 'Inception',
      genre: 'Khoa học viễn tưởng, Hành động',
      duration: 148,
      releaseDate: '2010-07-16',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
      imageUrl: 'https://example.com/images/inception.jpg'
    };
    this.movieService.addMovie(newMovie).subscribe(() => {
      this.loadMovies(); // Tải lại danh sách sau khi thêm phim
    });
  }

  // Xóa phim
  deleteMovie(movieId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa phim này?')) {
      this.movieService.deleteMovie(movieId).subscribe(
        () => {
          this.loadMovies(); // Tải lại danh sách sau khi xóa thành công
        },
        (error) => {
          this.errorMovies = 'Không thể xóa phim';
        }
      );
    }
  }

  // Chỉnh sửa thông tin phim
  editMovie(movieId: number): void {
    // Chuyển hướng tới trang chỉnh sửa phim với ID
    this.router.navigate(['/filmedit', movieId]);
  }

  // Quay lại trang chủ
  goToHome(): void {
    this.router.navigate(['/homepage']);
  }
}
