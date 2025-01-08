import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://localhost:7233/api/Movies'; // URL API backend

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả phim
  getAllMovies(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => response.$values || [])
    );
  }

  addMovie(movie: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      name: movie.name || '',          // Đảm bảo tên phim không null
      genre: movie.genre || '',        // Thể loại
      duration: movie.duration || 0,   // Thời lượng
      description: movie.description || '', // Mô tả
      trailerUrl: movie.trailerUrl || '',   // URL trailer
      director: movie.director || '',       // Đạo diễn
      imageUrl: movie.imageUrl || '',       // URL hình ảnh
      showtimes: movie.showtimes || [],     // Nếu không có lịch chiếu, gửi mảng rỗng
      movieReviews: []                      // Mảng rỗng cho MovieReviews
    });
  }

  // Sửa phim
// Cập nhật thông tin phim
updateMovie(movieId: number, updatedMovie: any): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/${movieId}`, {
    id: movieId,
    name: updatedMovie.name || '',          // Tên phim
    genre: updatedMovie.genre || '',        // Thể loại
    duration: updatedMovie.duration || 0,   // Thời lượng
    description: updatedMovie.description || '',  // Mô tả
    trailerUrl: updatedMovie.trailerUrl || '',    // URL trailer
    director: updatedMovie.director || '',        // Đạo diễn
    imageUrl: updatedMovie.imageUrl || '',        // URL hình ảnh
    showtimes: updatedMovie.showtimes || [],      // Mảng rỗng nếu không có lịch chiếu
    movieReviews: updatedMovie.movieReviews || [] // Mảng rỗng nếu không có đánh giá
  });
}





  // Xóa phim
  deleteMovie(movieId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${movieId}`);
  }
}
