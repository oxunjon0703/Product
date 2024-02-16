import { ResonseData } from "../../common/resData";
import { CreateProductDto } from "./validation/create.dto";
import { IProductQueryDto } from "./validation/query.dto";
import { UpdateProductDto } from "./validation/update.dto";
import { ProductEntity } from "./entity/product.entity";
import { ProductNotFoundException } from "./exception/product.exception";
import { IProductRepository } from "./interfaces/product.repository";
import { IProductService } from "./interfaces/product.service";
import { ProductRepository } from "./product.repository";

export class ProductService implements IProductService {
  private productRepository: IProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }
  async getOneById(id: number): Promise<ResonseData<ProductEntity>> {
    const foundProduct = await this.productRepository.getOneById(id);

    if (!foundProduct) {
      throw new ProductNotFoundException();
    }

    return new ResonseData<ProductEntity>("success", 200, foundProduct);
  }

  async update(
    id: number,
    dto: UpdateProductDto
  ): Promise<ResonseData<ProductEntity>> {
    const foundProductByIdResponse: ResonseData<ProductEntity> =
      await this.getOneById(id);

    const foundProduct = foundProductByIdResponse.data as ProductEntity;

    const updatedProductData = Object.assign(foundProduct, dto);

    const updatedProduct = await this.productRepository.update(
      id,
      updatedProductData
    );

    return new ResonseData<ProductEntity>("updated", 200, updatedProduct);
  }

  async getByName(
    name: string
  ): Promise<ResonseData<ProductEntity | undefined>> {
    const product = await this.productRepository.getByName(name);

    let resData: ResonseData<ProductEntity>;
    if (product) {
      resData = new ResonseData("success", 200, product);
    } else {
      resData = new ResonseData("not found", 404);
    }

    return resData;
  }

  async create(dto: CreateProductDto): Promise<ResonseData<ProductEntity>> {
    const newProduct: ProductEntity = new ProductEntity(dto);

    const createdProduct = await this.productRepository.insert(newProduct);

    return new ResonseData<ProductEntity>("created", 201, createdProduct);
  }

  async getAll(query: IProductQueryDto): Promise<ResonseData<ProductEntity[]>> {
    const products = await this.productRepository.getAll(query);

    return new ResonseData<ProductEntity[]>("success", 200, products);
  }

  async delete(id: number): Promise<ResonseData<ProductEntity>> {
    const foundProduct = await this.productRepository.getOneById(id);

    if (!foundProduct) {
      throw new ProductNotFoundException();
    }

    await this.productRepository.delete(id);

    return new ResonseData<ProductEntity>("success", 200, foundProduct);
  }
}
