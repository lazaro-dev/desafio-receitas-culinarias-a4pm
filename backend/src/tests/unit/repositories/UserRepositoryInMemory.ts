import UserRepository from '@/modules/user/UserRepository';
import { User } from '@/modules/user/entity/User';

export class UserRepositoryInMemory implements UserRepository {
    private items: User[] = [];

    async findByLogin(login: string): Promise<User | null> {
        const user = this.items.find(user => user.login === login);
        if (!user) return null;
        return user;
    }

    async create(dto: any): Promise<User> {
        const user = new User(
            dto.id,
            dto.login,
            dto.senha,
            dto.criado_em,
            dto.alterado_em,
            dto.nome
        );
        this.items.push(user);
        return user;
    }

}