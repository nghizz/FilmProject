import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MovieService } from '../../services/api/movie.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser
import { SharedDataService } from '../../services/api/sharedData.service';
import { Showtime } from '../../models/showtime.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  searchKeyword: string = ''; // Biến lưu từ khóa tìm kiếm
  currentUser: any = null;
  isLoggedIn: boolean = false;
  movies: any[] = []; // Danh sách phim đầy đủ
  searchResults: any[] = []; // Kết quả tìm kiếm phim
  upcomingMovies: any[] = []; // Phim sẽ chiếu trong ngày tới
  loading: boolean = false; // Trạng thái loading chung
  error: string | null = null; // Biến lưu lỗi chung
  limitedUpcomingMovies: any[] = []; // Phim giới hạn cho slider
  currentIndex: number = 0; // Chỉ mục phim hiện tại trong slider
  private scrollAmount = 300;
  private scrollInterval: any;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private sharedDataService: SharedDataService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.checkLoginStatus();
    this.fetchMovies(); // Load danh sách phim lúc đầu
    this.startAutoScroll(); // Khởi tạo auto scroll cho slider
  }

  checkLoginStatus(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('auth_token');
      if (storedUser) {
        this.isLoggedIn = true;
        this.currentUser = {
          username: localStorage.getItem('username'),
          role: localStorage.getItem('role'),
        };
        this.sharedDataService.setCustomerId(+localStorage.getItem('customerId')!);
        this.sharedDataService.setCustomerName(localStorage.getItem('username')!); // Lưu customerName// Lưu customerId vào service  
      } else {
        this.isLoggedIn = false;
        alert('Bạn đã đăng xuất trước đó! Vui lòng đăng nhập lại!');
        this.router.navigate(['/home']);
      }
    }
  }

  fetchMovies(): void {
    this.loading = true;
    this.error = null;

    this.movieService.getAllMovies().subscribe({
      next: (data) => {
        this.movies = data; // Dữ liệu phim đã được xử lý `showtimes`
        this.searchResults = [...this.movies];
        this.getUpcomingMovies(); // Lấy danh sách phim sắp chiếu
        this.loading = false;
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách phim:', err);
        this.error = 'Không thể tải danh sách phim. Vui lòng thử lại sau.';
        this.loading = false;
      },
    });
  }

  getUpcomingMovies(): void {
    const today = new Date(); // Lấy ngày hiện tại
    console.log('Danh sách phim trước khi lọc:', this.movies); // Kiểm tra dữ liệu phim

    this.upcomingMovies = this.movies.filter((movie) => {
      if (!movie.showtimes || movie.showtimes.length === 0) {
        console.warn('Phim không có thời gian chiếu:', movie);
        return false; // Bỏ qua phim không có thời gian chiếu
      }

      // Kiểm tra từng showtime trong showtimes
      const isUpcoming = movie.showtimes.some((showtime: Showtime) => {
        const startTime = new Date(showtime.startTime); // Lấy thời gian bắt đầu chiếu
        const endTime = new Date(showtime.endTime); // Lấy thời gian kết thúc chiếu
        return startTime <= today && today <= endTime; // Kiểm tra nếu phim đang chiếu
      });

      return isUpcoming; // Chỉ giữ lại phim có showtime hợp lệ
    });

    console.log('Danh sách phim sắp chiếu:', this.upcomingMovies); // Kiểm tra kết quả
    this.setLimitedUpcomingMovies(); // Gán danh sách phim giới hạn cho slider
  }

  setLimitedUpcomingMovies(): void {
    this.limitedUpcomingMovies = this.upcomingMovies.slice(0, 5); // Hiển thị 5 phim đầu tiên trong slider
  }

  // Hàm tìm kiếm phim
  onSearch(): void {
    if (!this.searchKeyword.trim()) {
      // Nếu từ khóa rỗng -> Hiển thị lại danh sách phim đầy đủ
      this.searchResults = this.movies;
      this.error = null;
      return;
    }

    // Nếu có từ khóa -> Tìm kiếm phim
    this.loading = true;
    this.error = null;

    this.movieService.searchMovies(this.searchKeyword).subscribe({
      next: (data) => {
        this.searchResults = data;
        if (this.searchResults.length === 0) {
          this.error = 'Không tìm thấy phim nào.';
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Không thể tìm kiếm phim. Vui lòng thử lại sau.';
        console.error(error);
        this.loading = false;
      },
    });
  }

  logout(): void {
    this.currentUser = null;
    this.isLoggedIn = false;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
    }
    this.router.navigate(['/home']);
  }

  // Thêm chức năng cuộn slider tự động
  startAutoScroll(): void {
    this.scrollInterval = setInterval(() => {
      this.slideRight();
    }, 3000); // Mỗi 3 giây cuộn sang phải
  }

  // Hàm cuộn slider trái
  slideLeft() {
    const slider = document.querySelector('.slider') as HTMLElement;
    slider.scrollLeft -= this.scrollAmount;
    this.currentIndex = (this.currentIndex - 1 + this.limitedUpcomingMovies.length) % this.limitedUpcomingMovies.length; // Quay lại cuối khi đi ngược
  }

  // Hàm cuộn slider phải
  slideRight() {
    const slider = document.querySelector('.slider') as HTMLElement;
    slider.scrollLeft += this.scrollAmount;
    this.currentIndex = (this.currentIndex + 1) % this.limitedUpcomingMovies.length; // Quay lại đầu khi hết
  }

  // Dừng cuộn tự động khi người dùng tương tác
  stopAutoScroll(): void {
    clearInterval(this.scrollInterval);
  }

  // Bắt sự kiện khi người dùng tương tác với slider
  onSliderInteract(): void {
    this.stopAutoScroll();
    this.startAutoScroll(); // Khởi động lại cuộn tự động sau khi tương tác
  }
}
