import { ResonseData } from "../../../common/resData";
import { CreateProductDto } from "../validation/create.dto";
import { IProductQueryDto } from "../validation/query.dto";
import { UpdateProductDto } from "../validation/update.dto";
import { ProductEntity } from "../entity/product.entity";

export interface IProductService {
  getOneById(id: number): Promise<ResonseData<ProductEntity>>;
  delete(id: number): Promise<ResonseData<ProductEntity>>;
  getAll(query: IProductQueryDto): Promise<ResonseData<ProductEntity[]>>;
  create(dto: CreateProductDto): Promise<ResonseData<ProductEntity>>;
  getByName(name: string): Promise<ResonseData<ProductEntity | undefined>>;
  update(
    id: number,
    dto: UpdateProductDto
  ): Promise<ResonseData<ProductEntity>>;
}
