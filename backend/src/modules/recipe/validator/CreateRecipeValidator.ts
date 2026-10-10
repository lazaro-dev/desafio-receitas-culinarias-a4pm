import { z } from 'zod';

export const CreateRecipeValidator = z.object({
    modo_preparo: z.string('Entrada inválida').min(1, 'O modo de preparo deve ter no mínimo 1 caractere'),
    id_categorias: z.number('Entrada inválida').positive().nullable(),
    nome: z.string('Entrada inválida').min(1, 'O nome deve ter no mínimo 1 caractere').nullable(),
    tempo_preparo_minutos: z.number('Entrada inválida').positive().nullable(),
    porcoes: z.number('Entrada inválida').positive().nullable(),
    ingredientes: z.string('Entrada inválida').min(1, 'Os ingredientes devem ter no mínimo 1 caractere').nullable(),
})
