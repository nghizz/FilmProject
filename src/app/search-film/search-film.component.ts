import { Component } from '@angular/core';

@Component({
  selector: 'app-search-film',
  templateUrl: './search-film.component.html',
  styleUrls: ['./search-film.component.css']
})
export class SearchFilmComponent {
  films = [
    { title: 'Mắt Biếc', actors: 'Trần Nghĩa, Nguyễn Lâm Thùy Anh', director: 'Victor Vũ', genre: 'Tình cảm' },
    { title: 'Hai Phượng', actors: 'Ngô Thanh Vân, Quốc Trường', director: 'Le Thanh Son', genre: 'Hành động' },
    { title: 'Tháng Năm Rực Rỡ', actors: 'Hồng Ánh, Lan Ngọc', director: 'Nguyễn Quang Dũng', genre: 'Nhạc kịch' },
    { title: 'Cua Lại Vợ Bầu', actors: 'Trấn Thành, Ninh Dương Lan Ngọc', director: 'Nhất Trung', genre: 'Hài' },
    { title: 'Bố Già', actors: 'Trấn Thành, Lê Giang', director: 'Trấn Thành', genre: 'Hài' },
    { title: 'Ngày Nảy Ngày Nay', actors: 'Hứa Vĩ Văn, Hồng Đăng', director: 'Nguyễn Quang Dũng', genre: 'Hài' },
    { title: 'Chị Mười Ba', actors: 'Angela Phương Trinh, BB Trần', director: 'Erik Nguyễn', genre: 'Hành động' },
    { title: 'Lật Mặt: 48h', actors: 'Lý Hải, Minh Nhí', director: 'Lý Hải', genre: 'Hành động' },
    { title: 'Trạng Tí', actors: 'Ngô Kiến Huy, Nhã Phương', director: 'Phan Gia Nhật Linh', genre: 'Phiêu lưu' },
    { title: 'Dòng Máu Anh Hùng', actors: 'Quách Ngọc Ngoan, Trương Ngọc Ánh', director: 'Lê Thanh Sơn', genre: 'Hành động' },
  ];

  searchResults = this.films;
  currentPage = 1;
  itemsPerPage = 3;

  get paginatedFilms() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.searchResults.slice(start, start + this.itemsPerPage);
  }

  onSearch(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.searchResults = this.films.filter(film =>
      film.title.toLowerCase().includes(searchTerm) ||
      film.actors.toLowerCase().includes(searchTerm) ||
      film.director.toLowerCase().includes(searchTerm) ||
      film.genre.toLowerCase().includes(searchTerm)
    );
    this.currentPage = 1; // Reset về trang 1 khi tìm kiếm
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      // Bạn có thể thực hiện hành động nào đó khi nhấn Enter
      this.onSearch(event);
    }
  }

  nextPage() {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.searchResults.length / this.itemsPerPage);
  }
}
