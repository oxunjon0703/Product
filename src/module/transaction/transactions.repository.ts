import { Postgres } from "../../lib/pg";
import { TransactionEntity } from "./entity/transactions.entity";
import { ITransactionRepository } from "./interfaces/transactions.repository";

export class TransactionRepository
  extends Postgres
  implements ITransactionRepository
{
  async getAll(): Promise<TransactionEntity[]> {
    return await this.fetchAll("select * from transactions");
  }

  async getById(id: number): Promise<TransactionEntity> {
    return await this.fetch("select * from transactions where id = $1", id);
  }

  async create(dto: TransactionEntity): Promise<TransactionEntity> {
    console.log(dto);
    return await this.fetch<TransactionEntity>(
      "insert into transactions(user_id, product_id, product_count, total_price ) values ($1, $2, $3, $4) returning *",
      dto.user_id,
      dto.product_id,
      dto.product_count,
      dto.total_price
    );
  }

  async delete(id: number): Promise<TransactionEntity> {
    return await this.fetch("delete from transactions where id = $1", id);
  }
}
