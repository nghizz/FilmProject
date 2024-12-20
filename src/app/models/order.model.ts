export interface Order {
  id: number;
  userId: number;
  totalPrice: number;
  orderDate: string;
  promotionId: number;
  paymentStatus: string;
  paymentMethod: string;
  transactionId: string;
}
