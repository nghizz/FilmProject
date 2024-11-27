import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  selectedShowtime: string | null = null;  // Đảm bảo giá trị null ban đầu

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Lắng nghe thay đổi route khi có thay đổi tham số (id)
    this.route.paramMap.subscribe(params => {
      const movieId = +params.get('id')!;
      this.movie = this.getMovieById(movieId);
      this.selectedShowtime = null;  // Reset suất chiếu khi thay đổi phim
    });
  }

  getMovieById(id: number) {
    // Danh sách phim mẫu
    const movies = [
      { id: 1, title: 'Inception', description: 'Một bộ phim về giấc mơ.', showtimes: ['10:00', '14:00'] },
      { id: 2, title: 'Avatar', description: 'Cuộc phiêu lưu tại Pandora.', showtimes: ['12:00', '16:00'] },
    ];

    // Tìm phim theo ID
    return movies.find(movie => movie.id === id);
  }

  onShowtimeSelect(showtime: string): void {
    // Cập nhật suất chiếu đã chọn
    this.selectedShowtime = showtime;
  }
}
