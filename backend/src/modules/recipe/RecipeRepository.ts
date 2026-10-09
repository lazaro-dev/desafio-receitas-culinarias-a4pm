import { Recipe } from "@/modules/recipe/entity/Recipe";
import { PaginateResponseRecipeDTO } from "./dto/PaginateResponseRecipeDTO";

export interface RecipeRepository {
    findById(id: number): Promise<Recipe | null>;
    search(data: any): Promise<PaginateResponseRecipeDTO>;
    create(data: any): Promise<Recipe>;
    update(data: any): Promise<Recipe>;
    delete(id: number): Promise<void>;
}