<script setup lang="ts">
import ButtonBase from "@/components/shared/button/ButtonBase.vue";
import InputText from "@/components/shared/input/InputText.vue";
import InputInt from "@/components/shared/input/InputInt.vue";
import SelectBase from "@/components/shared/input/SelectBase.vue";
import type { SaveRecipe } from "@/components/recipe/dto/recipe-form.dto";
import InputTextArea from "@/components/shared/input/InputTextArea.vue";

defineProps({
    actionName: {
        type: String,
        required: true,
    },
    loading: {
        type: Boolean,
        required: true,
    },
    categories: {
        type: Array,
        required: true,
    },
});
const formFilter = defineModel<SaveRecipe>({ required: true });

const emit = defineEmits(["submit", "clear"]);
</script>
<template>
    <div class="w-full flex justify-between items-center flex-col gap-3 px-12 py-10">
        <div class="sm:w-full">
            <InputText
                v-model="formFilter.nome"
                placeholder="Ex: Bolo de Chocolate"
                label="Nome"
            />
        </div>

        <div class="sm:w-full">
            <InputText
                v-model="formFilter.modo_preparo"
                placeholder="Ex: Colocar leite, ovos e o chocolate"
                label="Modo de Preparo"
            />
        </div>

        <div class="sm:w-full">
            <InputInt
                v-model="formFilter.tempo_preparo_minutos"
                placeholder="Ex: 3"
                label="Preparo(min)"
            />
        </div>

        <div class="sm:w-full">
            <InputInt
                v-model="formFilter.porcoes"
                placeholder="Ex: 5"
                label="Porções(qtd)"
            />
        </div>

        <div class="sm:w-full">
            <SelectBase
                v-model="formFilter.id_categorias"
                :items="categories"
                :prop="'nome'"
                :value="'id'"
                label="Categoria"
            />
        </div>

        <div class="sm:w-full">
            <InputTextArea
                v-model="formFilter.ingredientes"
                label="Ingredientes"
                :rows="2"
                placeholder="Ex: Leite, 3 ovos..."
            />
        </div>

        <ButtonBase
            type="submit"
            class="py-1.5 px-0 sm:w-full"
            color-type="primary"
            @click="emit('submit')"
        >
            <span v-if="!loading">{{ actionName }}</span>
            <span v-else>Salvando...</span>
        </ButtonBase>
    </div>
</template>

<style scoped></style>
