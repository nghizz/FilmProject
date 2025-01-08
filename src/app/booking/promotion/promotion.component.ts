import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromotionService } from '../../services/api/promotion.service';
import { UserApiService } from '../../services/api/user-api.service';
import { PromotionHistory } from '../../models/promotion-history.model';
import { Promotion } from '../../models/promotion.model';
import { SharedDataService } from '../../services/api/sharedData.service';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {
  currentUser: any = null; // Lưu thông tin người dùng
  isLoggedIn: boolean = false; // Kiểm tra trạng thái đăng nhập
  promotions: Promotion[] = []; // Danh sách khuyến mãi
  promotionHistory: PromotionHistory[] = []; // Danh sách lịch sử khuyến mãi
  selectedPromotion: Promotion | null = null; // Khuyến mãi được chọn
  errorMessage: string | null = null; // Lưu thông báo lỗi
  loading: boolean = false; // Trạng thái đang tải dữ liệu
  showHistory: boolean = false; // Trạng thái hiển thị lịch sử

  constructor(
    private promotionService: PromotionService,
    private userApiService: UserApiService,
    private router: Router,
    private sharedDataService: SharedDataService
  ) {}

  ngOnInit(): void {
    this.fetchPromotions(); // Gọi hàm lấy danh sách khuyến mãi khi component được khởi tạo
  }

  // Hàm lấy danh sách khuyến mãi từ API
  fetchPromotions(): void {
    this.promotionService.getAllPromotions().subscribe({
      next: (data) => {
        this.promotions = data; // Gán dữ liệu khuyến mãi vào biến
      },
      error: (err) => {
        console.error('Lỗi khi lấy danh sách khuyến mãi:', err);
      }
    });
  }

  // Chọn khuyến mãi
  selectPromotion(promotion: Promotion): void {
    this.selectedPromotion =
      this.selectedPromotion === promotion ? null : promotion; // Bật/tắt hiển thị
  }

  // Hiển thị lịch sử khuyến mãi
  showPromotionHistory(): void {
    this.loading = true;
    this.showHistory = true; // Mở trạng thái hiển thị lịch sử
    const userId = this.sharedDataService.getCustomerId();

    if (userId) {
      this.userApiService.getPromotionHistory(userId).subscribe({
        next: (response: any) => {
          if (response && response.$values) {
            this.promotionHistory = response.$values;
          } else {
            this.promotionHistory = [];
            console.error('Dữ liệu lịch sử khuyến mãi không hợp lệ:', response);
          }
          this.errorMessage = null;
          this.loading = false;
        },
        error: (err) => {
          console.error('Lỗi khi lấy lịch sử khuyến mãi:', err);
          this.promotionHistory = [];
          this.errorMessage = err.error?.message || 'Không thể tải lịch sử khuyến mãi.';
          this.loading = false;
        }
      });
    } else {
      this.errorMessage = 'Vui lòng đăng nhập để xem lịch sử khuyến mãi.';
      this.loading = false;
    }
  }

  // Đóng lịch sử khuyến mãi
  closePromotionHistory(): void {
    this.showHistory = false; // Đóng trạng thái hiển thị lịch sử
    this.promotionHistory = [];
  }

  logout(): void {
    this.currentUser = null; // Xóa thông tin người dùng
    this.isLoggedIn = false; // Đặt trạng thái đăng nhập thành false
    this.router.navigate(['/login']); // Điều hướng đến trang đăng nhập
  }
}
