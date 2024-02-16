import { ResonseData } from "../../../common/resData";
import { UserEntity } from "../entity/users.entity";
import { CreateUserDto } from "../validation/create.dto";

export interface IUserService {
    getAll(): Promise<ResonseData<UserEntity[]>>
    getById(id: number): Promise<ResonseData<UserEntity>>
    create(dto: CreateUserDto) : Promise<ResonseData<UserEntity>>
    update(id: number, dto: UserEntity) : Promise<ResonseData<UserEntity>>
    delete(id: number): Promise<ResonseData<UserEntity>>
    getByLogin(login: string): Promise<ResonseData<UserEntity | undefined>>;
}
