import type { Recipe } from "@/entities/recipe";
import type { RecipeApiDTO } from "@/services/dtos/recipe.dto";

export class RecipeMapper { 
    static toDomain(data: RecipeApiDTO): Recipe {
        return {
            id: data.id,
            modo_preparo: data.modo_preparo,
            id_usuarios: data.id_usuarios,
            id_categorias: data.id_categorias ?? null,
            nome: data.nome ?? null,
            ingredientes: data.ingredientes ?? null,
            tempo_preparo_minutos: data.tempo_preparo_minutos ?? null,
            porcoes: data.porcoes ?? null,
            criado_em: data.criado_em,
            alterado_em: data.alterado_em
        };
    }
}