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

  addMovie(): void {
    const newMovie = {
      id: 5,
      name: 'Inception',
      genre: 'Khoa học viễn tưởng, Hành động',
      duration: 148,
      releaseDate: '2010-07-16',
      description: 'A thief who steals corporate secrets through the use of dream-sharing technology.',
      imageUrl: 'https://example.com/images/inception.jpg',
      showtimes: ['2024-12-25T10:30:00', '2024-12-25T13:45:00']
    };
    this.movieService.addMovie(newMovie).subscribe(() => {
      this.loadMovies();
    });
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

  editMovie(movieId: number): void {
    this.router.navigate(['/filmedit', movieId]);
  }

  goToHome(): void {
    this.router.navigate(['/homepage']);
  }
}
