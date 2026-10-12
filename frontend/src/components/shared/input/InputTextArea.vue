<script setup lang="ts">
defineProps({
    placeholder: {
        type: String,
        required: false,
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
    rows: {
        type: Number,
        required: false,
        default: 3
    }
});

const modelValue = defineModel<string | null>({ required: true });
</script>

<template>
    <label
        :for="label"
        v-if="label"
        class="block text-sm font-medium text-gray-700"
        style="margin-bottom: 4px"
        >{{ label }}</label
    >

    <textarea
        :id="label"
        v-model="modelValue"
        class="w-full p-2 border border-gray-300 rounded-md shadow-sm text-gray-500"
        :disabled="disabled"
        :class="[{ 'opacity-60 cursor-not-allowed': disabled }]"
        :rows="rows"
        :placeholder="placeholder"
    ></textarea>

    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
</template>
