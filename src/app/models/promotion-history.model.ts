export interface PromotionHistory {
  orderId: number; // ID của đơn hàng
  promotionName: string; // Tên khuyến mãi
  promotionDescription: string; // Mô tả khuyến mãi
  discountPercentage: number; // Phần trăm giảm giá
  usedDate: string; // Ngày sử dụng khuyến mãi
  startDate: string; // Ngày bắt đầu hiệu lực của khuyến mãi
  endDate: string; // Ngày kết thúc hiệu lực của khuyến mãi
}
