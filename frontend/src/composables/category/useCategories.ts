import { useToastNotification } from "@/composables/ui/useToastNotification";
import { toStringApiValidationError } from "@/helpers/isApiValidationError";
import { ref } from "vue";
import { CategoryService } from "@/services/category.service";
import type { Category } from "@/entities/category";

export function useCategories() {
    const notification = useToastNotification();

    const loadingCategories = ref(false);

    const categories = ref<Category[]>([]);

    const getAll = async () => {
        loadingCategories.value = true;
        try {
            categories.value = await CategoryService.getAll();
            return true;
        } catch (error: unknown) {
            notification.showError(toStringApiValidationError(error));
            return false;
        } finally {
            loadingCategories.value = false;
        }
    }

    return {
        getAll,
        categories,
        loadingCategories
    }
}