<script setup lang="ts">
import ButtonBase from "@/components/shared/button/ButtonBase.vue";
import InputText from "@/components/shared/input/InputText.vue";
import CardSimple from "@/components/shared/card/CardSimple.vue";
import InputInt from "@/components/shared/input/InputInt.vue";
import SelectBase from "@/components/shared/input/SelectBase.vue";
import type { RecipeFormFilter } from "@/components/recipe/dto/recipe-form.dto";

defineProps({
    loadingCategories: {
        type: Boolean,
        required: true,
    },
    categories: {
        type: Array,
        required: true,
    },
});
const formFilter = defineModel<RecipeFormFilter>({ required: true });

const emit = defineEmits(["submit", "clear"]);
</script>
<template>
    <div class="relative">
        <ButtonBase
            color-type="absolute top-2 right-2 border border-transparent rounded-sm shadow-2xl hover:opacity-50 bg-gray-600 text-white px-2 mb-2 cursor"
            title="Limpar"
            @click="emit('clear')"
        >
            X
        </ButtonBase>

        <CardSimple class="w-full max-w-250 pt-10">
            <div class="flex justify-between items-center flex-col md:flex-row gap-3">
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
                    <SelectBase
                        v-model="formFilter.id_categorias"
                        :items="categories"
                        :prop="'nome'"
                        :value="'id'"
                        :disabled="loadingCategories"
                        :option-default="'Categoria'"
                    />
                </div>
                <ButtonBase
                    type="submit"
                    class="py-1.5 px-0 sm:w-full"
                    color-type="bg-orange-600 text-white hover:bg-orange-700"
                    @click="emit('submit')"
                >
                    Buscar
                </ButtonBase>
            </div>
        </CardSimple>
    </div>
</template>

<style scoped></style>
