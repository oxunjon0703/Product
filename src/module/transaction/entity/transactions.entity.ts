import { CreateTransactionDto } from "../validation/create.dto";

export class TransactionEntity {
  id: number = 0;
  user_id: number;
  product_id: number;
  product_count: number;
  total_price: number;
  constructor(dto: CreateTransactionDto) {
    this.user_id = dto.userId;
    this.product_id = dto.productId;
    this.product_count = dto.productCount;
    this.total_price = dto.totalPrice;
  }
}