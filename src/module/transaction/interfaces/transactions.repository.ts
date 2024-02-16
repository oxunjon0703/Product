import { TransactionEntity } from "../entity/transactions.entity";

export interface ITransactionRepository {
    getAll(): Promise<TransactionEntity[]>
    getById(id: number): Promise<TransactionEntity>
    create(dto: TransactionEntity): Promise<TransactionEntity>
    delete(id: number): Promise<TransactionEntity>
    
}
