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

  // Dữ liệu form thêm phim
  addMovieForm = {
    name: '',
    genre: '',
    duration: null,
    description: '',
    trailerUrl: '',
    director: '',
    imageUrl: ''
  };

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  // Tải danh sách phim
  loadMovies(): void {
    this.loadingMovies = true;
    this.movieService.getAllMovies().subscribe(
      (data) => {
        this.movies = data;
        this.loadingMovies = false;
      },
      (error) => {
        this.errorMovies = 'Không thể tải danh sách phim';
        this.loadingMovies = false;
      }
    );
  }

  // Thêm phim mới từ form
  addMovieFromForm(): void {
    const newMovie = {
      name: this.addMovieForm.name || '',        // Đảm bảo không null
      genre: this.addMovieForm.genre || '',      // Đảm bảo không null
      duration: this.addMovieForm.duration || 0, // Đảm bảo là số
      description: this.addMovieForm.description || '',
      trailerUrl: this.addMovieForm.trailerUrl || '',
      director: this.addMovieForm.director || '',
      imageUrl: this.addMovieForm.imageUrl || '',
      showtimes: [], // Nếu không có lịch chiếu, gửi mảng rỗng
      movieReviews: [] // Gửi mảng rỗng cho MovieReviews nếu không có dữ liệu
    };
  
    this.movieService.addMovie(newMovie).subscribe(
      (response) => {
        this.loadMovies(); // Load lại danh sách phim sau khi thêm
        alert('Phim mới đã được thêm thành công!');
        this.resetForm(); // Reset form
      },
      (error) => {
        console.error('Error adding movie:', error);
        alert('Không thể thêm phim mới. Lỗi: ' + JSON.stringify(error.error)); // Hiển thị lỗi chi tiết
      }
    );
  }
  
  editMovieForm = {
    id: null, // ID phim cần sửa
    name: '',
    genre: '',
    duration: null,
    description: '',
    trailerUrl: '',
    director: '',
    imageUrl: '',
    showtimes: [], // Thêm mảng lịch chiếu mặc định rỗng
    movieReviews: [] // Thêm mảng đánh giá mặc định rỗng
  };
  
  // Hiển thị form chỉnh sửa phim
  openEditForm(movie: any): void {
    this.editMovieForm = { ...movie }; // Gán dữ liệu của phim vào form
  }
  
  // Gửi dữ liệu chỉnh sửa lên server
 updateMovie(): void {
  if (this.editMovieForm.id === null) return;

  const updatedMovie = {
    ...this.editMovieForm,
    showtimes: this.editMovieForm.showtimes || [],       // Mảng lịch chiếu (nếu có)
    movieReviews: this.editMovieForm.movieReviews || [] // Mảng đánh giá phim (nếu có)
  };

  this.movieService.updateMovie(this.editMovieForm.id, updatedMovie).subscribe(
    () => {
      this.loadMovies(); // Tải lại danh sách phim sau khi sửa thành công
      alert('Phim đã được cập nhật thành công!');
      this.resetEditForm();
    },
    (error) => {
      console.error('Error updating movie:', error);
      alert('Không thể sửa phim. Lỗi: ' + JSON.stringify(error.error)); // Hiển thị lỗi chi tiết
    }
  );
}

  
  // Reset form chỉnh sửa
  resetEditForm(): void {
    this.editMovieForm = {
      id: null,
      name: '',
      genre: '',
      duration: null,
      description: '',
      trailerUrl: '',
      director: '',
      imageUrl: '',
      showtimes: [],
      movieReviews: []
    };
  }
  
  
  
  
  // Reset form
  resetForm(): void {
    this.addMovieForm = {
      name: '',
      genre: '',
      duration: null,
      description: '',
      trailerUrl: '',
      director: '',
      imageUrl: ''
    };
  }

  // Sửa phim
  editMovie(movieId: number): void {
    this.router.navigate(['/edit-movie', movieId]);
  }

  // Xóa phim
  deleteMovie(movieId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa phim này?')) {
      this.movieService.deleteMovie(movieId).subscribe(
        () => {
          this.loadMovies(); // Tải lại danh sách sau khi xóa phim
        },
        (error) => {
          this.errorMovies = 'Không thể xóa phim';
        }
      );
    }
  }

  // Quay lại trang chủ
  goToHome(): void {
    this.router.navigate(['/homepage']);
  }
}
