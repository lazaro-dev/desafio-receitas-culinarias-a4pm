import { Recipe } from "@/modules/recipe/entity/Recipe";
import { PaginateResponseRecipeDTO } from "./dto/PaginateResponseRecipeDTO";

export interface RecipeRepository {
    findById(id: number, userId: number): Promise<Recipe | null>;
    search(data: any, userId: number): Promise<PaginateResponseRecipeDTO>;
    create(data: any, userId: number): Promise<Recipe>;
    update(data: any, userId: number): Promise<Recipe>;
    delete(id: number, userId: number): Promise<void>;
}