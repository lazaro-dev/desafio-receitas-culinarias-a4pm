import { PrismaClientService } from "@/database/PrismaClient";
import { RecipeRepositoryPrisma } from "@/modules/recipe/RecipeRepositoryPrisma";
import { RecipeController } from "@/modules/recipe/RecipeController";
import { RecipeService } from "@/modules/recipe/RecipeService";
import { CategoryRepositoryPrisma } from "@/modules/category/CategoryRepositoryPrisma";

export const recipeControllerFactory = (): RecipeController => {
    const recipeRepository = new RecipeRepositoryPrisma(PrismaClientService);
    const categoryRepository = new CategoryRepositoryPrisma(PrismaClientService);
    const recipeService = new RecipeService(recipeRepository, categoryRepository);
    const recipeController: RecipeController = new RecipeController(recipeService);

    return recipeController;
}