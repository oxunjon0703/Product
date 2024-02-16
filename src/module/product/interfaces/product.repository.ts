import { IProductQueryDto } from "../validation/query.dto";
import { ProductEntity } from "../entity/product.entity";

export interface IProductRepository {
  getOneById(id: number): Promise<ProductEntity | undefined>;
  delete(id: number): Promise<ProductEntity>;
  getAll(query: IProductQueryDto): Promise<ProductEntity[]>;
  insert(entity: ProductEntity): Promise<ProductEntity>;
  getByName(name: string): Promise<ProductEntity | undefined>;
  update(id: number, entity: ProductEntity): Promise<ProductEntity>;
}