<script setup lang="ts">
import { useRecipe } from "@/composables/recipe/useRecipe";
import { useAuthStore } from "@/stores/useAuthStore";
import { onMounted, ref } from "vue";
import ButtonBase from "@/components/shared/button/ButtonBase.vue";
import RecipeTable from "@/components/recipe/table/RecipeTable.vue";
import RecipeFilter from "@/components/recipe/filter/RecipeFilter.vue";
import ModalBase from "@/components/shared/modal/ModalBase.vue";
import SaveRecipeForm from "@/components/recipe/form/SaveRecipeForm.vue";
import type { Recipe } from "@/entities/recipe.ts";
import type {
    RecipeFormFilter,
    SaveRecipe,
} from "@/components/recipe/dto/recipe-form.dto";
import { useCategories } from "@/composables/category/useCategories";
import type { CreateRecipeDTO, UpdateRecipeDTO } from "@/services/dtos/recipe.dto";

interface Mode {
    value: "create" | "edit" | "";
}

const authStore = useAuthStore();
const {
    search,
    create,
    update,
    remove,
    setRecipeSelected,
    data,
    loadingSearchSubmit,
    loadingCreateSubmit,
    loadingUpdateSubmit,
    recipeSelected,
} = useRecipe();
const { categories, loadingCategories, getAll } = useCategories();

const mode = ref<Mode>({ value: "" });
const isOpenSaveModal = ref(false);
const perPage = ref("10");

const formFilter = ref<RecipeFormFilter>({
    page: "1",
    per_page: perPage.value,
    search: "",
    id_categorias: null,
    tempo_preparo_minutos: null,
    porcoes: null,
});

const formSave = ref<SaveRecipe>({
    modo_preparo: "",
    id_categorias: null,
    nome: null,
    tempo_preparo_minutos: null,
    porcoes: null,
    ingredientes: null,
});

const openCreateModal = () => {
    isOpenSaveModal.value = true;
};

const openEditModal = (item: Recipe) => {
    isOpenSaveModal.value = true;
    mode.value = { value: "edit" };
    setRecipeSelected(item);

    formSave.value = {
        modo_preparo: item.modo_preparo,
        id_categorias: item.id_categorias,
        nome: item.nome,
        tempo_preparo_minutos: item.tempo_preparo_minutos,
        porcoes: item.porcoes,
        ingredientes: item.ingredientes,
    };
};

const clearFilter = () => {
    formFilter.value = {
        page: "1",
        per_page: perPage.value,
        search: "",
        id_categorias: null,
        tempo_preparo_minutos: null,
        porcoes: null,
    };
};

const clear = () => {
    formSave.value = {
        modo_preparo: "",
        id_categorias: null,
        nome: null,
        tempo_preparo_minutos: null,
        porcoes: null,
        ingredientes: null,
    };

    mode.value = { value: "" };
};

const searchLocal = async (page = 1) => {
    console.log("page", page);
    formFilter.value.page = page + "";
    search({
        page: page + "",
        per_page: formFilter.value.per_page + "",
        search: formFilter.value.search,
        id_categorias: formFilter.value.id_categorias,
        tempo_preparo_minutos: formFilter.value.tempo_preparo_minutos,
        porcoes: formFilter.value.porcoes,
    });
};

const createLocal = async () => {
    create({
        modo_preparo: formSave.value.modo_preparo,
        id_categorias: formSave.value.id_categorias
            ? parseInt(formSave.value.id_categorias + "")
            : null,
        nome: formSave.value.nome ?? null,
        tempo_preparo_minutos: formSave.value.tempo_preparo_minutos
            ? parseInt(formSave.value.tempo_preparo_minutos + "")
            : null,
        porcoes: formSave.value.porcoes ? parseInt(formSave.value.porcoes + "") : null,
        ingredientes: formSave.value.ingredientes ?? null,
    } as CreateRecipeDTO).then((result) => {
        if (result) {
            isOpenSaveModal.value = false;
            searchLocal();
            clear();
        }
    });
};

const updateLocal = async () => {
    update(
        {
            modo_preparo: formSave.value.modo_preparo,
            id_categorias: formSave.value.id_categorias
                ? parseInt(formSave.value.id_categorias + "")
                : undefined,
            nome: formSave.value.nome ?? undefined,
            tempo_preparo_minutos: formSave.value.tempo_preparo_minutos
                ? parseInt(formSave.value.tempo_preparo_minutos + "")
                : undefined,
            porcoes: formSave.value.porcoes
                ? parseInt(formSave.value.porcoes + "")
                : undefined,
            ingredientes: formSave.value.ingredientes ?? undefined,
        } as UpdateRecipeDTO,
        recipeSelected.value!.id
    ).then((result) => {
        if (result) {
            isOpenSaveModal.value = false;
            searchLocal();
            clear();
        }
    });
};

const removeLocal = async (recipe: Recipe) => {
    const confirmDelete = confirm("Tem certeza que deseja remover receita?");
    if (!confirmDelete) return;

    remove(recipe.id).then(() => searchLocal());
};

const getAllCategoriesLocal = () => {
    getAll();
};

onMounted(() => {
    searchLocal();
    getAllCategoriesLocal();
});
</script>
<template>
    <ButtonBase
        @click="authStore.logout"
        color-type="absolute top-5 right-5 border border-transparent rounded-sm shadow-2xl hover:opacity-50 bg-black text-white px-2 cursor"
    >
        Sair
    </ButtonBase>

    <div class="w-full flex justify-start items-center flex-col h-dvh m-5 gap-8">
        <RecipeFilter
            v-model="formFilter"
            :categories="categories"
            :loadingCategories="loadingCategories"
            @submit="searchLocal"
            @clear="clearFilter"
        />

        <RecipeTable
            :data="data"
            :loading="loadingSearchSubmit"
            @page-change="(page: number ) => searchLocal(page)"
            @selectedItem="openEditModal"
        >
            <template #actions="{ item }">
                <ButtonBase
                    type="submit"
                    class="py-0 px-2"
                    color-type="danger"
                    @click="removeLocal(item)"
                    title="Remover"
                >
                    X
                </ButtonBase>
            </template>
        </RecipeTable>

        <ButtonBase
            type="submit"
            class="py-1 px-2"
            :color-type="'bg-orange-600 text-white hover:bg-orange-700'"
            :disabled="loadingSearchSubmit || loadingCreateSubmit || loadingCategories"
            @click="openCreateModal"
        >
            Criar receita +
        </ButtonBase>
    </div>

    <ModalBase
        v-model="isOpenSaveModal"
        :title="mode.value === 'edit' ? 'Editar Receita' : 'Criar Receita'"
    >
        <div class="w-full flex justify-center">
            <SaveRecipeForm
                v-model="formSave"
                :recipeSelected="recipeSelected"
                :action-name="mode.value === 'edit' ? 'Editar' : 'Criar'"
                :categories="categories"
                :loading="
                    mode.value === 'edit' ? loadingUpdateSubmit : loadingCreateSubmit
                "
                @submit="mode.value === 'edit' ? updateLocal() : createLocal()"
            />
        </div>
    </ModalBase>
</template>

<style scoped></style>
