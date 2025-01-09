import { Component, Input } from '@angular/core';
import { MovieService } from '../../services/api/movie.service';

@Component({
  selector: 'app-films-edit',
  templateUrl: './films-edit.component.html',
  styleUrls: ['./films-edit.component.css']
})
export class FilmsEditComponent {
  @Input() editMovieForm = {
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
  router: any;
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    const movie = this.movieService.getMovieForEdit();
    if (movie) {
      this.editMovieForm = movie;
    }
  }
  updateMovie(): void {
    if (this.editMovieForm.id === null) return;

    const updatedMovie = {
      ...this.editMovieForm,
      showtimes: this.editMovieForm.showtimes || [],
      movieReviews: this.editMovieForm.movieReviews || []
    };

    this.movieService.updateMovie(this.editMovieForm.id, updatedMovie).subscribe(
      () => {
        alert('Phim đã được cập nhật thành công!');
        this.resetEditForm();
        window.history.back();
      },
      (error) => {
        console.error('Error updating movie:', error);
        alert('Không thể sửa phim. Lỗi: ' + JSON.stringify(error.error));
      }
    );
  }

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
  goToHome(): void {
    alert('Đang quay lại trang trước...');
    window.history.back(); // Quay trở lại trang trước
  }
}
