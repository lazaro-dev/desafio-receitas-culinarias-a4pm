
export interface AuthResponseDTO {
    token: string;
    user: {
        login: string;
        criado_em: Date;
        alterado_em: Date;
        nome?: string;
    }
}