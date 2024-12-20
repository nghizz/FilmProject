import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/api/movie.service';
import { Showtime } from '../../models/showtime.model';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie: any = null;
  loading: boolean = true;
  error: string | null = null;
  selectedShowtimeId: number | null = null;
  selectedDate: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const movieId = +params.get('id')!;
      this.fetchMovieDetails(movieId);
    });
  }

  fetchMovieDetails(id: number): void {
    this.loading = true;
    this.error = null;

    this.movieService.getMovieById(id).subscribe({
      next: (data) => {
        this.movie = data;

        // Kiểm tra và xử lý showtimes
        if (this.movie.showtimes && this.movie.showtimes.$values) {
          this.movie.showtimes = this.movie.showtimes.$values;
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Lỗi khi lấy chi tiết phim:', err);
        this.error = 'Không thể tải thông tin chi tiết phim. Vui lòng thử lại.';
        this.loading = false;
      },
    });
  }

  onShowtimeSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target?.value; // Xử lý trường hợp null
    if (value) {
      this.selectedShowtimeId = +value; // Cập nhật selectedShowtimeId
      console.log('Selected value:', this.selectedShowtimeId);
    } else {
      console.error('No value selected!');
    }
  }
  
  onDateSelect(event: Event): void {
    const selectedDate = (event.target as HTMLInputElement).value;
    this.selectedDate = selectedDate || null; // Gán null nếu không chọn ngày
    console.log("Selected Date:", this.selectedDate);
  }  

  continueBooking(): void {
    if (this.selectedShowtimeId !== null && this.selectedDate) {
      const selectedShowtime: Showtime | undefined = this.movie.showtimes.find((showtime: Showtime) => showtime.id === this.selectedShowtimeId);

      if (selectedShowtime) {
        this.router.navigate(['/seat-selection'], {
          queryParams: {
            movieName: this.movie?.name,
            date: this.selectedDate,
            showtime: selectedShowtime.startTime,
            showtimeId: this.selectedShowtimeId,
            movieId: this.movie.id
          }
        });
      } else {
        alert('Giờ chiếu không hợp lệ.');
      }
    } else {
      alert('Vui lòng chọn giờ chiếu và ngày đặt trước khi tiếp tục.');
    }
  }
  goBack(): void {
    this.router.navigate(['/homepage']);
  }

  todayDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }
}