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
      posterUrl: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2020/8/14/827987/6.jpg', // URL hình ảnh mẫu
      genre: 'Sci-Fi, Thriller' // Thể loại mẫu
    },
    {
      id: 2,
      title: 'Avatar',
      posterUrl: 'https://media-cdn-v2.laodong.vn/storage/newsportal/2022/9/24/1097116/621F831aedb37.jpg',
      genre: 'Action, Adventure'
    },
    {
      id: 3,
      title: 'The Matrix',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/vi/0/05/Gone_Girl_Poster.jpg',
      genre: 'Sci-Fi, Action'
    },
    {
      id: 4,
      title: 'Titanic',
      posterUrl: 'https://cdn-images.vtv.vn/562122370168008704/2023/4/3/030423-titanic-1680513963153431751533.png',
      genre: 'Drama, Romance'
    },
    {
      id: 5,
      title: 'The Dark Knight',
      posterUrl: 'https://upload.wikimedia.org/wikipedia/vi/2/2d/Poster_phim_K%E1%BB%B5_s%C4%A9_b%C3%B3ng_%C4%91%C3%AAm_2008.jpg',
      genre: 'Action, Crime'
    }
  ];
  
}
