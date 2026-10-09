import UserRepository from "@/modules/user/UserRepository";
import { RegisterDTO } from "@/modules/auth/dto/RegisterDTO";
import { CreateUserDTO } from "@/modules/user/dto/CreateUserDTO";
import { BadRequestError } from "@/errors/BadRequestError";
import { NotFoundError } from "@/errors/NotFoundError";
import { UnauthorizedError } from "@/errors/UnauthorizedError";
import { LoginDTO } from '@/modules/auth/dto/LoginDTO';
import { AuthResponseDTO } from "@/modules/auth/dto/AuthResponseDTO";
import { TokenJWTUtil } from "@/utils/TokenJWTUtil";
import { PasswordUtil } from "@/utils/PasswordUtil";

export class AuthService {
    constructor(
        private userRepository: UserRepository
    ) { }

    async login(dto: LoginDTO): Promise<AuthResponseDTO> {
        const user = await this.userRepository.findByLogin(dto.login);

        if (!user) throw new NotFoundError("Usuário não encontrado.");

        const isCorrectPassword: boolean = await PasswordUtil.compare(dto.senha, user.senha);

        if (!isCorrectPassword) {
            throw new UnauthorizedError('Usuário ou senha incorreta.');
        }

        const token = TokenJWTUtil.generateToken(user.id);

        return {
            token, user: {
                login: user.login,
                criado_em: user.criado_em,
                alterado_em: user.alterado_em,
                nome: user?.nome ?? undefined
            }
        };
    }

    async register(dto: RegisterDTO): Promise<AuthResponseDTO> {
        const user = await this.userRepository.findByLogin(dto.login);

        if (user) throw new BadRequestError("Usuário já cadastrado com esse login.");

        const userCreate = await this.userRepository.create(dto as CreateUserDTO);

        const token = TokenJWTUtil.generateToken(userCreate.id);

        return {
            token, user: {
                login: userCreate.login,
                criado_em: userCreate.criado_em,
                alterado_em: userCreate.alterado_em,
                nome: userCreate?.nome ?? undefined
            }
        };
    }
}