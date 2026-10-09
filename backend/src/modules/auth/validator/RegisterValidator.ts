import { z } from 'zod';

export const RegisterValidator = z.object({
    login: z.string('Entrada inválida').max(100, 'O login muito grande').min(3, 'O login deve ter no mínimo 3 caracteres'),
    senha: z.string('Entrada inválida').min(6, 'A senha deve ter no mínimo 6 caracteres'),
    nome: z.string('Entrada inválida').min(3, 'O nome deve ter no mínimo 3 caracteres').nullable(),
})
