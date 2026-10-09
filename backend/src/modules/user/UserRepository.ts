import { CreateUserDTO } from "@/modules/user/dto/CreateUserDTO";
import { User } from "@/modules/user/entity/User";

export default interface UserRepository {
    findByLogin(login: string): Promise<User| null>;
    create(data: CreateUserDTO): Promise<User>;
}