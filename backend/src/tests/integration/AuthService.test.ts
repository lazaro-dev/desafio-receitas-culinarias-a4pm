import { PrismaClientService } from "@/database/PrismaClient";
import { AuthService } from "@/modules/auth/AuthService";
import { CreateUserDTO } from "@/modules/user/dto/CreateUserDTO";
import { User } from "@/modules/user/entity/User";
import { UserRepositoryPrisma } from "@/modules/user/UserRepositoryPrisma";
import { PasswordUtil } from "@/utils/PasswordUtil";


describe('AuthService', () => {
    it('Registra o usuário no banco com senha protegida', async () => {
        const userRepository = new UserRepositoryPrisma(PrismaClientService);

        const authService = new AuthService(userRepository);

        const userNew = await authService.register({ login: 'login', senha: 'senha1' } as CreateUserDTO);

        const user: User | null = await userRepository.findByLogin(userNew.user.login);


        expect(user?.senha).not.toBe('Usuário ou senha incorreta.');
        expect(user?.login).toBe('login');
        expect(await PasswordUtil.compare('senha1', user!.senha)).toBe(true);
    })

    it('Não permitir registrar o usuário com o mesmo login', async () => {
        const userRepository = new UserRepositoryPrisma(PrismaClientService);
        await userRepository.create({
            login: 'login', senha: 'senha1', criado_em: new Date(), alterado_em: new Date()
        });
        const authService = new AuthService(userRepository);

        await expect(() => authService.register({ login: 'login', senha: 'senha1' } as CreateUserDTO))
            .rejects.toThrow('Usuário já cadastrado com esse login.');
    })
})