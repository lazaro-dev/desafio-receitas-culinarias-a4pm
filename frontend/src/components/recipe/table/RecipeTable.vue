<script setup lang="ts">
import CardSimple from "@/components/shared/card/CardSimple.vue";
import { DateTime } from "@/helpers/DateTime";
import type { PaginateResponseRecipeDTO } from "@/services/dtos/recipe.dto";
import { computed } from "vue";

const props = defineProps<{ data: PaginateResponseRecipeDTO; loading: boolean }>();

const emit = defineEmits(["selectedItem", "pageChange"]);

const existNextPage = computed(() => {
    return (props.data.total / props.data.per_page) > props.data.page;
});

const formatDate = (date: string) => DateTime.format(date);

const abbreviate = (text: string) => text.substring(0, 20);
</script>
<template>
    <div class="w-full max-w-250">
        <CardSimple>
            <div v-if="loading" class="w-full flex justify-center items-center">
                <span>Carregando...</span>
            </div>
            <table
                class="w-full table-auto border-collapse"
                v-if="!loading && data.data?.length > 0"
            >
                <thead class="font-extrabold">
                    <tr class="border-b border-gray-200">
                        <th class="p-3 text-center">Nome</th>
                        <th class="p-3 text-center">Modo de Preparo</th>
                        <th class="p-3 text-center">Tempo Preparo</th>
                        <th class="p-3 text-center">Ingredientes</th>
                        <th class="p-3 text-center">Porções</th>
                        <th class="p-3 text-center">Categoria</th>
                        <th class="p-3 text-center">Criado em</th>
                        <th class="p-3 text-center">-</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="recipe in data.data"
                        :key="recipe.id"
                        class="border-b border-gray-200 text-sm text-gray-500 hover:bg-orange-50 cursor-pointer"
                    >
                        <td class="p-3 text-center" @click="emit('selectedItem', recipe)">
                            {{ recipe.nome || "-" }}
                        </td>
                        <td
                            class="p-3 text-center w-[18%]"
                            @click="emit('selectedItem', recipe)"
                        >
                            {{ recipe.modo_preparo || "-" }}
                        </td>
                        <td
                            class="p-3 text-center w-[18%]"
                            @click="emit('selectedItem', recipe)"
                        >
                            {{
                                recipe.tempo_preparo_minutos
                                    ? `${recipe.tempo_preparo_minutos} min`
                                    : "-"
                            }}
                        </td>
                        <td class="p-3 text-center" @click="emit('selectedItem', recipe)">
                            {{
                                recipe.ingredientes
                                    ? abbreviate(recipe.ingredientes) + "..."
                                    : "-"
                            }}
                        </td>
                        <td class="p-3 text-center" @click="emit('selectedItem', recipe)">
                            {{ recipe.porcoes || "-" }}
                        </td>
                        <td class="p-3 text-center" @click="emit('selectedItem', recipe)">
                            {{ recipe.categoria?.nome || "-" }}
                        </td>
                        <td class="p-3 text-center" @click="emit('selectedItem', recipe)">
                            {{ formatDate(recipe.criado_em) }}
                        </td>
                        <td class="p-3 text-center">
                            <slot name="actions" :item="recipe"></slot>
                        </td>
                    </tr>
                </tbody>
            </table>

            <!-- Codigo para paginacao baseado no tailwind https://www.material-tailwind.com/docs/html/pagination -->
            <div class="flex justify-end gap-2 pt-5">
                <button
                    class="rounded-md border py-1 px-3 text-center text-sm shadow-sm hover:text-white hover:bg-orange-600 hover:border-orange-600 ml-2"
                    @click="emit('pageChange', data.page > 0 ? data.page - 1 : 1)"
                    v-if="!(data.page == 1)"
                >
                    Anterior
                </button>

                <button
                    class="min-w-9 rounded-md bg-orange-600 py-1 px-3 border border-transparent text-center text-sm text-white shadow-md focus:bg-orange-700 focus:shadow-none hover:bg-orange-700 active:shadow-non ml-2"
                    :class="[{ 'bg-orange-600 text-white': true }]"
                >
                    {{ data.page }}
                </button>

                <button
                    class="min-w-9 rounded-md border py-1 px-3 text-center text-sm shadow-sm hover:text-white hover:bg-orange-600 hover:border-orange-600 ml-2"
                    @click="emit('pageChange', data.page + 1)"
                    v-if="existNextPage"
                >
                    Próximo
                </button>
            </div>

            <div
                v-if="!loading && data.data?.length === 0"
                class="w-full flex justify-center items-center"
            >
                <span>Sem receitas</span>
            </div>
        </CardSimple>
    </div>
</template>

<style scoped></style>
