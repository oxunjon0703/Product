import { UserEntity } from "../entity/users.entity";

export interface IUserRepository {
    getAll(): Promise<UserEntity[]>;
    getById(id: number): Promise<UserEntity>;
    getByLogin(login: string): Promise<UserEntity>;
    create(entity: UserEntity): Promise<UserEntity>
    update(id: number, entity: UserEntity): Promise<UserEntity>
    delete(id: number): Promise<UserEntity>
}
