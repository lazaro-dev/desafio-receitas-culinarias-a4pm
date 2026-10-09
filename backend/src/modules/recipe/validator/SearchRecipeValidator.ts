import { z } from 'zod';

export const SearchRecipeValidator = z.object({
    page: z.string('Entrada inválida').optional(),
    per_page: z.string('Entrada inválida').optional(),
    modo_preparo: z.string('Entrada inválida').min(1, 'O modo de preparo deve ter no mínimo 1 caracteres').optional(),
    id_categorias: z.number('Entrada inválida').positive().nullable().optional(),
    nome: z.string('Entrada inválida').min(1, 'O nome deve ter no mínimo 1 caracteres').nullable().optional(),
    tempo_preparo_minutos: z.number('Entrada inválida').positive().nullable().optional(),
    porcoes: z.number('Entrada inválida').positive().nullable().optional(),
    ingredientes: z.string('Entrada inválida').min(1, 'Os ingredientes devem ter no mínimo 1 caracteres').nullable().optional(),
})
