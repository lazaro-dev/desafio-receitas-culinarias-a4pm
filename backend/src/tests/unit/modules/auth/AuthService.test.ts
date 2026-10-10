import { AuthService } from "@/modules/auth/AuthService";
import { UserRepositoryInMemory } from "../../repositories/UserRepositoryInMemory";
import { CreateUserDTO } from "@/modules/user/dto/CreateUserDTO";
import { PasswordUtil } from "@/utils/PasswordUtil";

describe('AuthService', () => {
    it('Cadastro com login que já existe', async () => {
        const userRepository = new UserRepositoryInMemory();
        userRepository.create({
            id: 1,
            login: 'login',
            senha: 'senha1',
            criado_em: new Date(),
            alterado_em: new Date()
        });
        const authService = new AuthService(userRepository);

        await expect(() => authService.register({ login: 'login', senha: 'senha1' } as CreateUserDTO))
            .rejects.toThrow('Usuário já cadastrado com esse login.');
    })

    it('Login incorreto', async () => {
        const userRepository = new UserRepositoryInMemory();
        const authService = new AuthService(userRepository);

        userRepository.create({
            id: 1,
            login: 'login',
            senha: PasswordUtil.hash('senha1'),
            criado_em: new Date(),
            alterado_em: new Date()
        });

        await expect(() => authService.login({ login: 'login', senha: 'senha___' } as CreateUserDTO))
            .rejects.toThrow('Usuário ou senha incorreta.');
    })
})