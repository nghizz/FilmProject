import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/api/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie: any = null; // Thông tin chi tiết phim
  loading: boolean = true; // Trạng thái loading
  error: string | null = null; // Thông báo lỗi
  selectedShowtime: string | null = null; // Giờ chiếu đã chọn
  selectedDate: string | null = null; // Ngày đặt đã chọn

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

  }

  // Xử lý khi chọn giờ chiếu
  onShowtimeSelect(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const selectedDate = new Date(selectedValue);
    this.selectedShowtime = selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) || null;
  }

  // Xử lý khi người dùng chọn ngày đặt
  onDateSelect(event: Event): void {
    const selectedDate = (event.target as HTMLInputElement).value;
    this.selectedDate = selectedDate || null;
  }

  // Xử lý sự kiện nhấn nút "Tiếp tục"
  continueBooking(): void {
    if (this.selectedShowtime && this.selectedDate) {
      this.router.navigate(['/seat-selection'], {
        queryParams: {
          movieName: this.movie?.name,
          date: this.selectedDate,
          showtime: this.selectedShowtime
        }
      });
    } else {
      alert('Vui lòng chọn giờ chiếu và ngày đặt trước khi tiếp tục.');
    }
  }

  // Xử lý sự kiện nhấn nút "Quay lại"
  goBack(): void {
    this.router.navigate(['/homepage']); // Hoặc đường dẫn bạn muốn quay lại
  }

  todayDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }
}