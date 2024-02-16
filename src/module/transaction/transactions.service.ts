import { ResonseData } from "../../common/resData";
import { ProductService } from "../product/product.service";
import { TransactionEntity } from "./entity/transactions.entity";
import { TransactionNotFoundExist } from "./exception/transactions.exception";
import { ITransactionRepository } from "./interfaces/transactions.repository";
import { ITransactionService } from "./interfaces/transactions.service";
import { TransactionRepository } from "./transactions.repository";


export class TransactionService implements ITransactionService {
  private transactionRepository: ITransactionRepository;

  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  async getAll(): Promise<ResonseData<TransactionEntity[]>> {
      const transactions = await this.transactionRepository.getAll();

      const resData = new ResonseData("get All Transactions", 200, transactions);

      return resData;
  }

  async getById(id: number): Promise<ResonseData<TransactionEntity>> {
      const foundTransaction = await this.transactionRepository.getById(id);

      if(!foundTransaction) {
        throw new TransactionNotFoundExist()
      }

      const resData = new ResonseData("get by id transaction", 200, foundTransaction)

      return resData;
  }

  async create(dto: TransactionEntity): Promise<ResonseData<TransactionEntity>> {
    console.log("dto ser :", dto);
    const newTransaction = await this.transactionRepository.create(dto)

    const resData = new ResonseData("create", 200, newTransaction)

    return resData;
  }

  async delete(id: number): Promise<ResonseData<TransactionEntity>> {
    const foundTransaction = await this.transactionRepository.getById(id);

    if(!foundTransaction) {
      throw new TransactionNotFoundExist()
    }

    await this.transactionRepository.delete(id)

    const resData = new ResonseData("delete transaction", 200, foundTransaction)

    return resData;
  }
}
