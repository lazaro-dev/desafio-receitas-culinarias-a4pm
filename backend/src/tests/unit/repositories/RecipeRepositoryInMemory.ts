import { RecipeRepository } from '@/modules/recipe/RecipeRepository';
import { Recipe } from '@/modules/recipe/entity/Recipe';

export class RecipeRepositoryInMemory implements RecipeRepository {
    private items: Recipe[] = [];

    async findById(id: number): Promise<Recipe | null> {
        return this.items.find(item => item.id === id) || null;
    }

    async search(data: any): Promise<any> {
        return this.items;
    }

    async create(dto: any): Promise<Recipe> {
        let id = 1;
        if (this.items.length > 0) {
            id = this.items[this.items.length - 1].id + 1;
        }

        const recipe = new Recipe(
            id,
            dto.modo_preparo,
            dto.id_usuarios,
            dto.id_categorias ?? null,
            dto.nome ?? null,
            dto.ingredientes ?? null,
            dto.tempo_preparo_minutos ?? null,
            dto.porcoes ?? null,
            dto.criado_em,
            dto.alterado_em
        );
        this.items.push(recipe);
        return recipe;
    }

    async update(dto: any): Promise<Recipe> {
        const recipe = new Recipe(
            dto.id,
            dto.modo_preparo,
            dto.id_usuarios,
            dto.id_categorias ?? null,
            dto.nome ?? null,
            dto.ingredientes ?? null,
            dto.tempo_preparo_minutos ?? null,
            dto.porcoes ?? null,
            dto.criado_em,
            dto.alterado_em
        );
        this.items.push(recipe);
        return recipe;
    }

    async delete(id: number): Promise<void> {
        this.items = this.items.filter(item => item.id !== id);
    }
}