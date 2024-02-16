import { ResonseData } from "../../../common/resData";
import { TransactionEntity } from "../entity/transactions.entity";

export interface ITransactionService {
    getAll(): Promise<ResonseData<TransactionEntity[]>>
    getById(id : number): Promise<ResonseData<TransactionEntity>>
    create(dto : TransactionEntity): Promise<ResonseData<TransactionEntity>>
    delete(id: number): Promise<ResonseData<TransactionEntity>>
}
