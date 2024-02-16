import { CreateProductDto } from "../validation/create.dto";

export class ProductEntity {
  id: number = 0;
  name: string;
  price: number;
  count: number;
  constructor(dto: CreateProductDto) {
    this.name = dto.name;
    this.price = dto.price;
    this.count = dto.count;
  }
}
