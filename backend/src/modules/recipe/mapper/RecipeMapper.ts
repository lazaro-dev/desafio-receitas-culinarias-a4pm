import { Recipe } from "@/modules/recipe/entity/Recipe";
import { Recipe as PrismaRecipe } from "@prisma/client";

export class RecipeMapper {
    static toDomain(data: PrismaRecipe): Recipe {
        return new Recipe(
            data.id,
            data.modo_preparo,
            data.id_usuarios,
            data.id_categorias ?? null,
            data.nome ?? null,
            data.ingredientes ?? null,
            data.tempo_preparo_minutos ?? null,
            data.porcoes ?? null,
            data.criado_em,
            data.alterado_em
        );
    }
}