import type { User } from "@/entities/user";

export interface CredentialsDTO {
    login: string;
    senha: string;
}

export interface RegisterCredentialsDTO {
    nome?: string | null;
    login: string;
    senha: string;
}

export interface AuthResponseDTO {
    token: string;
    user: User;
}