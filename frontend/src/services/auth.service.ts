import type { AuthResponseDTO, CredentialsDTO, RegisterCredentialsDTO } from "@/services/dtos/auth.dto";
import { HttpService } from "@/services/http.service";


export class AuthService {
    static async login(dto: CredentialsDTO): Promise<AuthResponseDTO> {
        const response = await HttpService.post<AuthResponseDTO>('/auth/login', dto);

        return response as AuthResponseDTO;
    }

    static async register(dto: RegisterCredentialsDTO): Promise<AuthResponseDTO> {
        const response = await HttpService.post<AuthResponseDTO>('/auth/register', dto);

        return response as AuthResponseDTO;
    }
}
