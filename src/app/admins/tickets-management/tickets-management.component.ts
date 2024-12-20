import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/api/movie.service';

@Component({
  selector: 'app-tickets-management',
  templateUrl: './tickets-management.component.html',
  styleUrl: './tickets-management.component.css'
})
export class TicketsManagementComponent implements OnInit {
  movies: any[] = [];
  loadingMovies = false;
  errorMovies: string = '';

  constructor(private movieService: MovieService,private router: Router) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.loadingMovies = true;
    this.movieService.getAllMovies().subscribe(
      (data) => {
        console.log(data);
        this.movies = data.map((movie: any) => ({
          ...movie,
          showtimes: (movie.showtimes || []).map((showtime: any) => {
            const tickets = showtime.tickets || {};
            const totalSeats = tickets.totalSeats || 0;
            const soldSeats = tickets.soldSeats || 0;
            const remainingSeats = totalSeats - soldSeats;

            return {
              ...showtime,
              totalSeats,
              soldSeats,
              remainingSeats
            };
          })
        }));
        this.loadingMovies = false;
      },
      (error) => {
        this.errorMovies = 'Không thể tải danh sách phim';
        this.loadingMovies = false;
      }
    );
  }
}
