import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/api/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-films-edit',
  templateUrl: './films-edit.component.html',
  styleUrls: ['./films-edit.component.css']
})
export class FilmsEditComponent implements OnInit {
  movie: Movie | undefined;
  availableShowtimes: string[] = []; // Array to store available showtimes
  loading: boolean = false;
  errorMessage: string = '';
  id: number = 0;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    /* const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loading = true;
      this.movieService.getMovieById(id).subscribe({
        next: (data) => {
          this.movie = data;
          this.fetchAvailableShowtimes(); // Fetch showtimes after movie data is loaded
        },
        error: (err) => {
          this.errorMessage = 'Không thể tải thông tin phim.';
          this.loading = false;
          console.error(err);
        },
      });
    } */
  }

  /* fetchAvailableShowtimes(): void {
    this.movieService.getMovieById(id).subscribe({
      next: (data: string[]) => {
        this.availableShowtimes = data; // Dữ liệu showtimes được lưu vào mảng
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Không thể tải danh sách giờ chiếu.';
        this.loading = false;
        console.error(err);
      },
    });
  } */
  // Save movie with updated details
  saveMovie(): void {
    if (this.movie) {
      this.loading = true;
      this.movieService.updateMovie(this.movie).subscribe({
        next: () => {
          alert('Cập nhật phim thành công!');
          this.router.navigate(['/movies']);
        },
        error: (err) => {
          this.errorMessage = 'Không thể lưu thay đổi. Vui lòng thử lại.';
          this.loading = false;
          console.error(err);
        },
      });
    }
  }

  // Go back to the films list page
  goBackHome(): void {
    this.router.navigate(['/films']);
  }
}
