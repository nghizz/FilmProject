import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://localhost:7233/api/Movies';

  constructor(private http: HttpClient) { }

  // Lấy danh sách tất cả phim
  getAllMovies(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        const movies = response.$values || [];
        // Chuyển đổi showtimes.$values thành showtimes trực tiếp
        return movies.map((movie: any) => {
          if (movie.showtimes?.$values) {
            movie.showtimes = movie.showtimes.$values;
          }
          return movie;
        });
      })
    );
  }
  // Lấy danh sách phim theo id
  getMovieById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((movie) => {
        return {
          ...movie,
          showtimes: Array.isArray(movie.showtimes?.$values)
            ? movie.showtimes.$values
            : []
        };
      })
    );
  }

  getShowtimeList(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        const movies = response.$values || [];
        return movies.map((movie: any) => ({
          ...movie,
          showtimes: this.formatShowtimes(movie.showtimes?.$values || [])
        }));
      })
    );
  }

  // Hàm định dạng giờ chiếu (chuyển sang hh:mm)
  private formatShowtimes(showtimes: any[]): string[] {
    return showtimes.map((time: string) => {
      const date = new Date(time);
      return !isNaN(date.getTime())
        ? date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        : 'Không hợp lệ';
    });
  }



  // Tìm kiếm phim theo từ khóa
  searchMovies(keyword: string): Observable<any[]> {
    const url = `${this.apiUrl}/search?keyword=${encodeURIComponent(keyword)}`;
    return this.http.get<any>(url).pipe(
      map(response => response.$values || [])
    );
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