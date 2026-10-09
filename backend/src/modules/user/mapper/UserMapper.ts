import { User } from "@/modules/user/entity/User";
import { User as PrismaCategory } from "@prisma/client";

export class UserMapper {
    static toDomain(data: PrismaCategory): User {
        return new User(
            data.id,
            data.login,
            data.senha,
            data.criado_em,
            data.alterado_em,
            data.nome
        );
    }
}