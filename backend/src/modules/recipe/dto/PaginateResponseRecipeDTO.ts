import { Recipe } from "@/modules/recipe/entity/Recipe";


export interface PaginateResponseRecipeDTO {
    data: Recipe[];
    page: number;
    per_page: number;
    total: number;
}