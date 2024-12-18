import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://localhost:7233/api/Movies';

  constructor(private http: HttpClient) {}

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => response.$values || []),
      map((movies: any[]) =>
        movies.map((movie) => {
          if (movie.showtimes && typeof movie.showtimes === 'object') {
            movie.showtimes = Object.values(movie.showtimes); // Chuyển đổi object sang array
          }
          return movie as Movie; // Ép kiểu sang Movie
        })
      ),
      catchError((error) => {
        console.error('Lỗi khi lấy danh sách phim:', error);
        return throwError(() => new Error('Không thể tải danh sách phim. Vui lòng thử lại sau.'));
      })
    );
  }
  

  // Lấy danh sách phim theo id
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
      map(response => response.$values || [])
    );
  }
   // Lấy danh sách giờ chiếu
   getShowtimes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/showtimes`);
  }

  // Thêm phim mới
  addMovie(movie: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, movie);  // Gửi yêu cầu POST để thêm phim
  }

  // Xóa phim
  deleteMovie(movieId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${movieId}`);  // Gửi yêu cầu DELETE để xóa phim
  }

  // Cập nhật phim
  updateMovie(movie: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${movie.id}`, movie);  // Đảm bảo ID được gửi
  }
}
