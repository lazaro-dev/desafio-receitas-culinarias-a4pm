import { z } from 'zod';

export const SearchRecipeValidator = z.object({
    page: z.string('Entrada inválida').optional(),
    per_page: z.string('Entrada inválida').optional(),
    search: z.string('Entrada inválida').min(1, 'A busca deve ter no mínimo 1 caractere').optional(),
    id_categorias: z.number('Entrada inválida').positive().nullable().optional(),
    tempo_preparo_minutos: z.number('Entrada inválida').positive().nullable().optional(),
    porcoes: z.number('Entrada inválida').positive().nullable().optional(),
    // nome: z.string('Entrada inválida').min(1, 'O nome deve ter no mínimo 1 caracteres').nullable().optional(),
    // ingredientes: z.string('Entrada inválida').min(1, 'Os ingredientes devem ter no mínimo 1 caracteres').nullable().optional(),
})
