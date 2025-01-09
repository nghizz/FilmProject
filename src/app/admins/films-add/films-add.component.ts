import { Component } from '@angular/core';
import { MovieService } from '../../services/api/movie.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-films-add',
  templateUrl: './films-add.component.html',
  styleUrls: ['./films-add.component.css']
})
export class FilmsAddComponent {
  addMovieForm = {
    name: '',
    genre: '',
    duration: null,
    description: '',
    trailerUrl: '',
    director: '',
    imageUrl: ''
  };
  router: any;

  constructor(private movieService: MovieService) {}

  addMovieFromForm(): void {
    const newMovie = {
      ...this.addMovieForm,
      showtimes: [],
      movieReviews: []
    };

    this.movieService.addMovie(newMovie).subscribe(
      () => {
        alert('Phim mới đã được thêm thành công!');
        this.resetForm();
        window.history.back();
      },
      (error) => {
        console.error('Error adding movie:', error);
        alert('Không thể thêm phim mới. Lỗi: ' + JSON.stringify(error.error));
      }
    );
  }

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

  goToHome(): void {
    alert('Đã quay trở lại trang chủ!');
    window.history.back(); // Quay trở lại trang trước
  }
}