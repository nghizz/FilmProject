export interface Payment {
  showtimeId: number;
  customerId: number;
  movieId: number; // ID của phim
  dateOrder: string | Date;  // Thay đổi kiểu thành string hoặc Date
  showtime: string;
  seatNumbers: string;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  promotionId?: number; // Mã khuyến mãi (optional)
}
