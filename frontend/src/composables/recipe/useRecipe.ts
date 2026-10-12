import { useToastNotification } from "@/composables/ui/useToastNotification";
import { toStringApiValidationError } from "@/helpers/isApiValidationError";
import { ref } from "vue";
import { RecipeService } from "@/services/recipe.service";
import type { CreateRecipeDTO, PaginateResponseRecipeDTO, SearchRecipeDTO, UpdateRecipeDTO } from "@/services/dtos/recipe.dto";
import type { Recipe } from "@/entities/recipe";

export function useRecipe() {
    const notification = useToastNotification();

    const data = ref<PaginateResponseRecipeDTO>({
        data: [],
        page: 1,
        per_page: 3,
        total: 0
    });
    const loadingSearchSubmit = ref(false);
    const loadingCreateSubmit = ref(false);
    const loadingUpdateSubmit = ref(false);
    const loadingDeleteSubmit = ref(false);

    const recipeSelected = ref<Recipe>();

    const search = async (params: SearchRecipeDTO) => {
        loadingSearchSubmit.value = true;
        try {

            data.value = await RecipeService.search(params) as PaginateResponseRecipeDTO;

            return true;
        } catch (error: unknown) {

            notification.showError(toStringApiValidationError(error));

            return false;
        } finally {
            loadingSearchSubmit.value = false;
        }
    }

    const create = async (dto: CreateRecipeDTO) => {
        loadingCreateSubmit.value = true;
        try {

            await RecipeService.create(dto);

            notification.showSuccess('Receita criada com sucesso!');

            return true;
        } catch (error: unknown) {

            notification.showError(toStringApiValidationError(error));

            return false;
        } finally {
            loadingCreateSubmit.value = false;
        }
    }

    const update = async (dto: UpdateRecipeDTO, id: number) => {
        loadingUpdateSubmit.value = true;
        try {

            await RecipeService.update(dto, id);

            notification.showSuccess('Receita atualizada com sucesso!');

            return true;
        } catch (error: unknown) {
            notification.showError(toStringApiValidationError(error));
            return false;
        } finally {
            loadingUpdateSubmit.value = false;
        }
    }

    const remove = async (id: number) => {
        loadingDeleteSubmit.value = true;
        try {

            await RecipeService.delete(id);

            notification.showSuccess('Receita removida com sucesso!');

            return true;
        } catch (error: unknown) {
            notification.showError(toStringApiValidationError(error));
            return false;
        } finally {
            loadingDeleteSubmit.value = false;
        }
    }

    const setRecipeSelected = (recipe: Recipe) => {
        recipeSelected.value = recipe;
    }

    return {
        search,
        create,
        update,
        remove,
        setRecipeSelected,
        data,
        loadingSearchSubmit,
        loadingCreateSubmit,
        loadingUpdateSubmit,
        loadingDeleteSubmit,
        recipeSelected
    }
}