import { z } from 'zod';

export const LoginValidator = z.object({
    login: z.string('Entrada inválida').max(100, 'O login muito grande').min(3, 'O login deve ter no mínimo 3 caracteres'),
    senha: z.string('Entrada inválida').min(6, 'A senha deve ter no mínimo 6 caracteres'),
})