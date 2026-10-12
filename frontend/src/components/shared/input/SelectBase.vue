<script setup lang="ts">
const props = defineProps({
    items: {
        type: Array,
        required: true,
    },
    value: {
        type: [String, Number],
        default: "value", // campo do objeto usado como valor
    },
    prop: {
        type: String,
        default: "label", // campo do objeto usado como label
    },
    disabled: {
        type: Boolean,
        required: false,
    },
    label: {
        type: String,
        required: false,
    },
    error: {
        type: String,
        required: false,
    },
    optionDefault: {
        type: String,
        required: false,
        default: "Selecionar",
    }
});

const modelValue = defineModel<string | number | null>({ required: true });

const getValue = (item: unknown) =>
    String((item as Record<string, string | number>)[props.value]);
const getLabel = (item: unknown) =>
    String((item as Record<string, string | number>)[props.prop]);
</script>

<template>
    <label
        :for="label"
        v-if="label"
        class="block text-sm font-medium text-gray-700"
        style="margin-bottom: 4px"
        >{{ label }}</label
    >

    <select
        v-model="modelValue"
        class="w-full p-2 border border-gray-300 rounded-md shadow-sm text-gray-500"
        :disabled="disabled"
        :class="[{ 'opacity-60 cursor-not-allowed': disabled }]"
    >
        <option selected disabled :value="null">{{optionDefault}}</option>
        <option v-for="item in items" :value="getValue(item)" :key="getValue(item)">
            {{ getLabel(item) }}
        </option>
    </select>

    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
</template>
