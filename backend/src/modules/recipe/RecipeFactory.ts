import { PrismaClientService } from "@/database/PrismaClient";
import { RecipeRepositoryPrisma } from "@/modules/recipe/RecipeRepositoryPrisma";
import { RecipeController } from "@/modules/recipe/RecipeController";
import { RecipeService } from "@/modules/recipe/RecipeService";

export const recipeControllerFactory = (): RecipeController => {
    const recipeRepository = new RecipeRepositoryPrisma(PrismaClientService);
    const recipeService = new RecipeService(recipeRepository);
    const recipeController: RecipeController = new RecipeController(recipeService);

    return recipeController;
}