import { PrismaClient } from "@prisma/client";
import UserRepository from '@/modules/user/UserRepository';
import { User } from "@/modules/user/entity/User";
import { UserMapper } from "@/modules/user/mapper/UserMapper";
import { CreateUserDTO } from "@/modules/user/dto/CreateUserDTO";
import { PasswordUtil } from "@/utils/PasswordUtil";

export class UserRepositoryPrisma implements UserRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async findByLogin(login: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({ where: { login } });

        if (!user) return null;

        return UserMapper.toDomain(user);
    }

    async create(data: CreateUserDTO): Promise<User> {
        const password = PasswordUtil.hash(data.senha);
        const user = await this.prisma.user.create({
            data: {
                nome: data.nome,
                login: data.login,
                senha: password,
                criado_em: new Date(),
                alterado_em: new Date(),
            }
        });

        return UserMapper.toDomain(user);
    }
}