import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrl: './movie-review.component.css'
})
export class MovieReviewComponent {
  selectedMovie: { id: number; title: string; posterUrl: string; genre: string } | null = null;

  movies = [
    {
      id: 1,
      title: 'Inception',
      posterUrl: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2020/8/14/827987/6.jpg',
      genre: 'Sci-Fi, Thriller'
    },
    {
      id: 2,
      title: 'Avatar',
      posterUrl: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2022/9/24/1097116/621F831aedb37.jpg',
      genre: 'Action, Adventure'
    }
  ];

  selectMovie(movie: { id: number; title: string; posterUrl: string; genre: string }): void {
    this.selectedMovie = movie;
  }
  getMovieById(movieId: number): { id: number; title: string; posterUrl: string; genre: string } | undefined {
    return this.movies.find(movie => movie.id === movieId);
  }

  reviews: { customer: string; rating: number; comment: string; likes: number; dislikes: number }[] = [];
  // Dữ liệu đầu vào từ form
  customer: string = 'Khách hàng ẩn danh';
  rating: number | null = null;
  commentText: string | undefined;
  userReview: any;
  reviewText: string | undefined;

  // Xử lý thay đổi xếp hạng
  onRatingChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.rating = parseInt(selectElement.value, 10);
  }

  // Gửi đánh giá
  submitReview() {
    if (this.rating && this.commentText) {
      this.reviews.push({
        customer: this.customer,
        rating: this.rating,
        comment: this.commentText,
        likes: 0,
        dislikes: 0,
      });
      // Xóa form sau khi gửi
      this.rating = null;
      this.commentText = '';
    }
  }

  // Thêm "thích"
  likeReview(index: number) {
    this.reviews[index].likes++;
  }

  // Thêm "không thích"
  dislikeReview(index: number) {
    this.reviews[index].dislikes++;
  }
}