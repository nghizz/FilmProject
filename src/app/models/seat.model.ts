export interface Seat {
  id: number;
  rowNumber: number;
  seatNumber: number;
  isAvailable: boolean;
  seatType: string;
  price: number;
  isSelected: boolean; // Added for UI selection
}