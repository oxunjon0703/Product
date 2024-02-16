import { ResonseData } from "../../common/resData";
import { Error } from "../../common/types/types";
import { checkDto } from "../../lib/cheackDto";
import { CreateProductDto, createProductSchema } from "./validation/create.dto";
import { IProductQueryDto, productQuerySchema } from "./validation/query.dto";
import { UpdateProductDto, updateProductSchema } from "./validation/update.dto";
import { ProductNameAlreadyExist } from "./exception/product.exception";
import { IProductService } from "./interfaces/product.service";
import { Request, Response } from "express";

export class ProductController {
  private productService: IProductService;

  constructor(productService: IProductService) {
    this.productService = productService;
  }

  async getOneById(req: Request, res: Response) {
    try {
      const productId: number = Number(req.params.id);

      const resData = await this.productService.getOneById(productId);

      res.status(resData.statusCode).json(resData);
    } catch (error: Error | any) {
      const resData = new ResonseData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const query: IProductQueryDto = req.query;

      checkDto<IProductQueryDto>(productQuerySchema, query);

      const resData = await this.productService.getAll(query);

      res.status(resData.statusCode).json(resData);
    } catch (error: Error | any) {
      const resData = new ResonseData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const dto: CreateProductDto = req.body;

      checkDto<CreateProductDto>(createProductSchema, dto);

      const getByName = await this.productService.getByName(dto.name);

      if (getByName.data) {
        throw new ProductNameAlreadyExist();
      }

      const resData = await this.productService.create(dto);

      res.status(resData.statusCode).json(resData);
    } catch (error: Error | any) {
      const resData = new ResonseData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const dto: UpdateProductDto = req.body;
      const productId: number = Number(req.params.id);
      checkDto<UpdateProductDto>(updateProductSchema, dto);

      await this.productService.getOneById(productId);

      if (dto?.name) {
        const getByName = await this.productService.getByName(dto.name);

        if (getByName.data && getByName.data.id !== productId) {
          throw new ProductNameAlreadyExist();
        }
      }

      const resData = await this.productService.update(productId, dto);

      res.status(resData.statusCode).json(resData);
    } catch (error: Error | any) {
      const resData = new ResonseData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const productId: number = Number(req.params.id);

      const resData = await this.productService.delete(productId);

      res.status(resData.statusCode).json(resData);
    } catch (error: Error | any) {
      const resData = new ResonseData(
        error.message,
        error.statusCode || 500,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }
}
