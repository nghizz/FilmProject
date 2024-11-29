import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})

export class ReviewComponent {
  @Input() purchasedMovies: { id: number; title: string; posterUrl: string; genre: string; }[] = [];
  reviews: { customer: string; rating: number; comment: string; likes: number; dislikes: number }[] = [];
  // Dữ liệu đầu vào từ form
  customer: string = 'Khách hàng ẩn danh'; 
  rating: number | null = null;
  commentText: string | undefined;
selectedMovie: any;
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