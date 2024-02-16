import { Postgres } from "../../lib/pg";
import { UserEntity } from "./entity/users.entity";
import { IUserRepository } from "./interfaces/users.repository";

export class UserRepository extends Postgres implements IUserRepository {
  async getByLogin(login: string): Promise<UserEntity> {
    return await this.fetch<UserEntity>(
      "select * from users where login = $1",
      login
    );
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.fetchAll("select * from users");
  }

  async getById(id: number): Promise<UserEntity> {
    return await this.fetch<UserEntity>(
      "select * from users where id = $1",
      id
    );
  }

  async create(entity: UserEntity): Promise<UserEntity> {
    return await this.fetch<UserEntity>(
      "insert into users(login, password, balance) values ($1, $2, $3) returning *",
      entity.login,
      entity.password,
      entity.balance
    );
  }

  async update(id: number, entity: UserEntity): Promise<UserEntity> {
    console.log(entity);
    return await this.fetch<UserEntity>(
      `update users set login = $2, password = $3, balance = $4 where id = $1 returning *`,
      id,
      entity.login,
      entity.password,
      entity.balance
    );
  }

  async delete(id: number): Promise<UserEntity> {
    return await this.fetch<UserEntity>("delete from users where id = $1", id);
  }
}
