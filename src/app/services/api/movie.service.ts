import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // Đảm bảo MovieService được cung cấp trong toàn ứng dụng
})
export class MovieService {
  private apiUrl = 'https://localhost:7233/api/Movies';

  constructor(private http: HttpClient) {}

  // Lấy danh sách tất cả phim
  getAllMovies(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => response.$values || []) // Trích xuất danh sách phim từ $values
    );
  }

  //lấy danh sách phim theo id
  getMovieById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((movie) => {
        // Chuyển đổi Object showtimes thành Array
        if (movie.showtimes && typeof movie.showtimes === 'object') {
          movie.showtimes = Object.values(movie.showtimes);
        }
        return movie;
      })
    );
  }
    
  // Tìm kiếm phim theo từ khóa
  searchMovies(keyword: string): Observable<any[]> {
    const url = `${this.apiUrl}/search?keyword=${encodeURIComponent(keyword)}`;
    return this.http.get<any>(url).pipe(
      map(response => response.$values || []) // Lấy danh sách phim từ $values
    );
  }

  addMovie(movie: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, movie);  // Gửi yêu cầu POST để thêm phim
  }
  deleteMovie(movieId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${movieId}`);  // Gửi yêu cầu DELETE để xóa phim
  }
}