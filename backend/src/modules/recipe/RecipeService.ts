import { RecipeRepository } from "@/modules/recipe/RecipeRepository";
import { SearchRecipeDTO } from "@/modules/recipe/dto/SearchRecipeDTO";
import { CreateRecipeDTO } from "@/modules/recipe/dto/CreateRecipeDTO";
import { UpdateRecipeDTO } from "@/modules/recipe/dto/UpdateRecipeDTO";
import { NotFoundError } from "@/errors/NotFoundError";

export class RecipeService {
    constructor(
        private recipeRepository: RecipeRepository
    ) { }

    async search(dto: SearchRecipeDTO) {
        return this.recipeRepository.search(dto);
    }

    async create(dto: CreateRecipeDTO) {
        const result = this.recipeRepository.create(dto);

        return result;
    }

    async update(dto: UpdateRecipeDTO) {
        const recipe = await this.recipeRepository.findById(dto.id);

        if (!recipe) throw new NotFoundError("Receita não encontrada.");

        const result = this.recipeRepository.update(dto);

        if (result instanceof Error) throw result;

        return result;
    }

    async delete(id: number) {
        const recipe = await this.recipeRepository.findById(id);

        if (!recipe) throw new NotFoundError("Receita não encontrada.");

        const result = this.recipeRepository.delete(id);

        return result;
    }
}