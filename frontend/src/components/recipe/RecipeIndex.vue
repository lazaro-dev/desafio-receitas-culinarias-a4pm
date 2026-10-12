<script setup lang="ts">
import { useRecipe } from "@/composables/recipe/useRecipe";
import { useAuthStore } from "@/stores/useAuthStore";
import { onMounted, ref } from "vue";
import ButtonBase from "@/components/shared/button/ButtonBase.vue";
import InputText from "@/components/shared/input/InputText.vue";
import CardSimple from "@/components/shared/card/CardSimple.vue";
import InputInt from "@/components/shared/input/InputInt.vue";

const authStore = useAuthStore();
const { search, data } = useRecipe();

const searchContent = ref("");
const perPage = ref(3);

interface FormFilter {
    page: string;
    per_page: string;
    search: string;
    id_categorias: number | null;
    tempo_preparo_minutos: number | null;
    porcoes: number | null;
}

const formFilter = ref<FormFilter>({
    page: "1",
    per_page: "3",
    search: "",
    id_categorias: null,
    tempo_preparo_minutos: null,
    porcoes: null,
});

const searchLocal = async (page = 1) => {
    search({
        page: page + "",
        per_page: perPage.value + "",
        search: searchContent.value,
        id_categorias: null,
        tempo_preparo_minutos: null,
        porcoes: null,
    });
};

onMounted(() => {
    searchLocal();
});
</script>
<template>
    <ButtonBase
        @click="authStore.logout"
        color-type="absolute top-5 right-5 border border-transparent rounded-sm shadow-2xl hover:opacity-50 bg-black text-white px-2 cursor"
    >
        Sair
    </ButtonBase>
    <div class="w-full flex justify-start items-center flex-col h-dvh m-5">
        <CardSimple class="w-full max-w-250">
            <div class="flex justify-between items-center sm:flex-col md:flex-row gap-3">
                <div class="sm:w-full">
                    <InputText v-model="formFilter.search" placeholder="Search" />
                </div>
                <div class="sm:w-full">
                    <InputInt
                        v-model="formFilter.tempo_preparo_minutos"
                        placeholder="Preparo(min)"
                    />
                </div>
                <div class="sm:w-full">
                    <InputInt v-model="formFilter.porcoes" placeholder="Porções(qtd)" />
                </div>
                <div class="sm:w-full">
                    <InputText v-model="searchContent" placeholder="Search" />
                </div>
                <ButtonBase
                    type="submit"
                    class="py-1 px-2 sm:w-full"
                    color-type="bg-orange-600 text-white hover:bg-orange-700"
                >
                    Buscar
                </ButtonBase>
            </div>
        </CardSimple>

        <div>
            <table class="table-auto">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Modo de Preparo</th>
                        <th>Tempo de Preparo</th>
                        <th>Ingredientes</th>
                        <th>Porções</th>
                        <th>Criado em</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="recipe in data.data" :key="recipe.id">
                        <td>{{ recipe.nome || "-" }}</td>
                        <td>{{ recipe.modo_preparo || "-" }}</td>
                        <td>{{ recipe.tempo_preparo_minutos }}</td>
                        <td>{{ recipe.ingredientes }}</td>
                        <td>{{ recipe.porcoes }}</td>
                        <td>{{ recipe.criado_em }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped></style>
