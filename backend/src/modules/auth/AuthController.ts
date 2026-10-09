import { type Response, type Request } from "express";
import { AuthService } from "@/modules/auth/AuthService";
import { RegisterDTO } from "@/modules/auth/dto/RegisterDTO";
import { AuthResponseDTO } from '@/modules/auth/dto/AuthResponseDTO';
import { LoginDTO } from "@/modules/auth/dto/LoginDTO";

export class AuthController {
    constructor(private readonly authService: AuthService) { }

    async login(req: any, res: any) {
        const result = await this.authService.login({
            login: req.body.login,
            senha: req.body.senha
        } as LoginDTO);

        return res.status(200).json(result);
    }

    async register(req: Request, res: Response) {
        const dto: RegisterDTO = {
            login: req.body.login,
            senha: req.body.senha,
            criado_em: new Date(),
            alterado_em: new Date(),
            nome: req.body?.nome
        };

        const result = await this.authService.register(dto);

        return res.status(201).json(result);
    }
}