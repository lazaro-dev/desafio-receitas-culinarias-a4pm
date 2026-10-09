export interface CreateUserDTO 
{
    login: string;
    senha: string;
    criado_em: Date;
    alterado_em: Date;
    nome?: string;
}