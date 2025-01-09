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

  editMovieForm = {
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

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loadingMovies = true;
    this.movieService.getShowtimeList().subscribe(
      (data) => {
        this.movies = data.map((movie: any) => ({
          ...movie,
          showtimes: movie.showtimes // Directly access the showtimes array
        }));
        this.loadingMovies = false;
      },
      (error) => {
        this.errorMovies = 'Không thể tải danh sách phim';
        this.loadingMovies = false;
      }
    );
  }

  // Định dạng giờ chiếu theo "hh:mm"
  formatShowtime(showtime: string): string {
    const date = new Date(showtime);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  }


  deleteMovie(movieId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa phim này?')) {
      this.movieService.deleteMovie(movieId).subscribe(
        () => {
          this.loadMovies();
        },
        (error) => {
          this.errorMovies = 'Không thể xóa phim';
        }
      );
    }
  }

  goToAddMovie(): void {
    this.router.navigate(['/add-movie']);
  }

  goToEditMovie(movie: any): void {
    this.movieService.setMovieForEdit(movie);
    this.router.navigate(['/filmedit', movie.id]);
  }
  
  goToHome(): void {
    this.router.navigate(['/homepage']);
  }
}
