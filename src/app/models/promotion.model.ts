export interface Promotion {
  id: number; // ID của khuyến mãi
  title: string; // Tiêu đề khuyến mãi
  description: string; // Mô tả khuyến mãi
  discount: number; // Phần trăm giảm giá
  startDate: string; // Ngày bắt đầu
  endDate: string; // Ngày kết thúc
  imageUrl: string; // Đường dẫn ảnh khuyến mãi
}