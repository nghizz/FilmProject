import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movies = [
    {
      id: 1,
      title: 'Inception',
      posterUrl: 'https://via.placeholder.com/150x225', // URL hình ảnh mẫu
      genre: 'Sci-Fi, Thriller' // Thể loại mẫu
    },
    {
      id: 2,
      title: 'Avatar',
      posterUrl: 'https://via.placeholder.com/150x225',
      genre: 'Action, Adventure'
    },
    {
      id: 3,
      title: 'The Matrix',
      posterUrl: 'https://via.placeholder.com/150x225',
      genre: 'Sci-Fi, Action'
    },
    {
      id: 4,
      title: 'Titanic',
      posterUrl: 'https://via.placeholder.com/150x225',
      genre: 'Drama, Romance'
    },
    {
      id: 5,
      title: 'The Dark Knight',
      posterUrl: 'https://via.placeholder.com/150x225',
      genre: 'Action, Crime'
    }
  ];
  
}
