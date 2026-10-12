import { RecipeRepository } from "@/modules/recipe/RecipeRepository";
import { SearchRecipeDTO } from "@/modules/recipe/dto/SearchRecipeDTO";
import { CreateRecipeDTO } from "@/modules/recipe/dto/CreateRecipeDTO";
import { UpdateRecipeDTO } from "@/modules/recipe/dto/UpdateRecipeDTO";
import { NotFoundError } from "@/errors/NotFoundError";
import CategoryRepository from "@/modules/category/CategoryRepository";
import { AccessDeniedError } from "@/errors/AccessDeniedError";

export class RecipeService {
    constructor(
        private recipeRepository: RecipeRepository,
        private categoryRepository: CategoryRepository
    ) { }

    async search(dto: SearchRecipeDTO, userId: number) {
        return this.recipeRepository.search(dto, userId);
    }

    async create(dto: CreateRecipeDTO, userId: number) {

        if (dto.id_categorias) {
            const recipe = await this.categoryRepository.findById(dto.id_categorias as number);
            
            if (!recipe) throw new NotFoundError("Categoria não encontrada.");
        }

        const result = this.recipeRepository.create(dto, userId);

        return result;
    }

    async update(dto: UpdateRecipeDTO, userId: number) {
        const recipe = await this.recipeRepository.findById(dto.id, userId);

        if (!recipe) throw new NotFoundError("Receita não encontrada.");

        if (recipe.id_usuarios !== userId) throw new AccessDeniedError("Receita não pertence ao usuário.");

        const result = this.recipeRepository.update(dto, userId);

        return result;
    }

    async delete(id: number, userId: number) {
        const recipe = await this.recipeRepository.findById(id, userId);

        if (!recipe) throw new NotFoundError("Receita não encontrada.");

        const result = this.recipeRepository.delete(id, userId);

        return result;
    }
}