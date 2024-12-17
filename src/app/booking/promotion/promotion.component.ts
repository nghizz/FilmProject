import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PromotionService } from '../../services/api/promotion.service';
import { UserApiService } from '../../services/api/user-api.service';
import { PromotionHistory } from '../../models/promotion-history.model';
import { Promotion } from '../../models/promotion.model';

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

  constructor(
    private promotionService: PromotionService,
    private userApiService: UserApiService,
    private router: Router
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

    // Hàm xử lý khi nhấn nút "Lịch sử sử dụng khuyến mãi"
    showPromotionHistory(): void {

      this.loading = true; // Hiển thị trạng thái đang tải
      const userId = this.currentUser.id; // Lấy userId từ thông tin người dùng đã đăng nhập
  
      this.userApiService.getPromotionHistory(userId).subscribe({
        next: (history) => {
          this.promotionHistory = history; // Lưu danh sách lịch sử khuyến mãi
          this.errorMessage = null; // Xóa thông báo lỗi
          this.loading = false; // Tắt trạng thái đang tải
        },
        error: (err) => {
          console.error('Lỗi khi lấy lịch sử khuyến mãi:', err);
          this.errorMessage = err.error?.message || 'Không thể tải lịch sử khuyến mãi.';
          this.loading = false; // Tắt trạng thái đang tải
        }
      });
    }

  logout() {
    this.currentUser = null; // Xóa thông tin người dùng
    this.isLoggedIn = false; // Đặt trạng thái đăng nhập thành false
    this.router.navigate(['/login']); // Điều hướng đến trang đăng nhập
  }
}