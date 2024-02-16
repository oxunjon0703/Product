import { Request, Response } from "express";
import { ITransactionService } from "./interfaces/transactions.service";
import { ResonseData } from "../../common/resData";
import { Error } from "../../common/types/types";
import { checkDto } from "../../lib/cheackDto";
import {
  CreateTransactionDto,
  createTransactionSchema,
} from "./validation/create.dto";
import { IUserService } from "../users/interfaces/users.service";
import { IProductService } from "../product/interfaces/product.service";
import { UserNotFoundException } from "../users/exception/users.exception";
import { ProductNotFoundException } from "../product/exception/product.exception";

export class TransactionController {
  private transactionService: ITransactionService;
  private userService: IUserService;
  private productService: IProductService;

  constructor(
    transactionService: ITransactionService,
    userService: IUserService,
    productService: IProductService
  ) {
    this.transactionService = transactionService;
    this.userService = userService;
    this.productService = productService;
  }

  async getAll(req: Request, res: Response) {
    try {
      const resData = await this.transactionService.getAll();

      res.status(resData.statusCode).json(resData);
    } catch (error: Error | any) {
      const resData = new ResonseData(
        error.message,
        error.statusCode,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params?.id);

      const resData = await this.transactionService.getById(id);

      res.status(resData.statusCode).json(resData);
    } catch (error: Error | any) {
      const resData = new ResonseData(
        error.message,
        error.statusCode,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const dto = req.body;

      console.log(1);

      checkDto<CreateTransactionDto>(createTransactionSchema, dto);

      const {data: checkUser} = await this.userService.getById(dto.userId)
      console.log(2);

      if(!checkUser) {
        throw new UserNotFoundException()
      }

      const {data: checkProduct} = await this.productService.getOneById(dto.productId)

      if(!checkProduct) {
        throw new ProductNotFoundException()
      }

      if(!(checkProduct.count > dto.productCount)) {
        throw new Error("There are not enough products")
      }

      dto.totalPrice = Number(dto.productCount) * Number(checkProduct.price)

      const resData = await this.transactionService.create(dto)

      res.status(resData.statusCode).json(resData)
    } catch (error: Error | any) {
      const resData = new ResonseData(
        error.message,
        error.statusCode,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params?.id);

      const resData = await this.transactionService.delete(id);

      res.status(resData.statusCode).json(resData);
    } catch (error: Error | any) {
      const resData = new ResonseData(
        error.message,
        error.statusCode,
        null,
        error
      );

      res.status(resData.statusCode).json(resData);
    }
  }
}
