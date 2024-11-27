import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie: any = null; // Đặt giá trị khởi tạo là null
  selectedShowtime: string | null = null;
  selectedDate: string = new Date().toISOString().split('T')[0]; // Khởi tạo ngày hiện tại

  username: string = '';
  rating: number | null = null;
  comment: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const movieId = +params.get('id')!;
      this.movie = this.getMovieById(movieId);
      this.selectedShowtime = null; 
    });
  }

  getMovieById(id: number) {
    const movies = [
      { 
        id: 1, 
        title: 'Inception', 
        director: 'Christopher Nolan', 
        releaseYear: 2010, 
        genre: 'Sci-Fi, Thriller', 
        description: 'Một bộ phim về giấc mơ.', 
        showtimes: ['10:00', '14:00','16:00','18:00', '20:00'], 
        posterUrl: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2020/8/14/827987/6.jpg' 
      },
      { 
        id: 2, 
        title: 'Avatar', 
        director: 'James Cameron', 
        releaseYear: 2009, 
        genre: 'Action, Adventure', 
        description: 'Cuộc phiêu lưu tại Pandora.', 
        showtimes: ['12:00', '16:00','21:00','23:00'], 
        posterUrl: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2022/9/24/1097116/621F831aedb37.jpg' 
      },
      // Các phim khác...
    ];

    return movies.find(movie => movie.id === id) || null; // Trả về null nếu không tìm thấy phim
  }

  onShowtimeSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedShowtime = selectElement.value;
  }

  onDateSelect(event: Event): void {
    const dateElement = event.target as HTMLInputElement;
    this.selectedDate = dateElement.value;
  }

  navigateToSeatSelection(): void {
    if (this.selectedShowtime && this.selectedDate) {
      this.router.navigate(['seat-selection/:showtime'], { queryParams: { showtime: this.selectedShowtime, date: this.selectedDate } });
    } else {
      alert('Vui lòng chọn giờ chiếu và ngày.');
    }
  }

 //handleSubmit(): void {
   // if (this.username && this.rating && this.comment) {
     // alert(`Đánh giá thành công!\nTên: ${this.username}\nĐiểm: ${this.rating}\nBình luận: ${this.comment}`);
      // Reset các trường sau khi gửi
      //this.username = '';
      //this.rating = null;
     // this.comment = '';
    //} else {
    // alert('Vui lòng điền đầy đủ thông tin.');
    // }
 // }
}