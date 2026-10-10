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

    async search(dto: SearchRecipeDTO) {
        return this.recipeRepository.search(dto);
    }

    async create(dto: CreateRecipeDTO) {
        const recipe = await this.categoryRepository.findById(dto.id_categorias as number);

        if (!recipe) throw new NotFoundError("Categoria não encontrada.");

        const result = this.recipeRepository.create(dto);

        return result;
    }

    async update(dto: UpdateRecipeDTO, id_usuarios: number) {
        const recipe = await this.recipeRepository.findById(dto.id);

        if (!recipe) throw new NotFoundError("Receita não encontrada.");

        if (recipe.id_usuarios !== id_usuarios) throw new AccessDeniedError("Receita não pertence ao usuário.");

        const result = this.recipeRepository.update(dto);

        return result;
    }

    async delete(id: number) {
        const recipe = await this.recipeRepository.findById(id);

        if (!recipe) throw new NotFoundError("Receita não encontrada.");

        const result = this.recipeRepository.delete(id);

        return result;
    }
}