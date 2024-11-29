export interface Seat {
    id: number;
    rowNumber: number; // Đảm bảo là kiểu number
    seatNumber: number; // Đảm bảo là kiểu number
    isAvailable: boolean;
    seatType: string;
    price: number;
    isSelected?: boolean; // Thuộc tính tùy chọn để theo dõi trạng thái chọn
  }
  