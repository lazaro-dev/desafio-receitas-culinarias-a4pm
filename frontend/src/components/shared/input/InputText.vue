<script setup lang="ts">
defineProps({
    modelValue: {
        type: String,
        required: true,
    },
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
    }
});

const modelValue = defineModel<string>({ required: true });
</script>

<template>
    <label :for="label" v-if="label" class="block text-sm font-medium text-gray-700" style="margin-bottom: 4px">{{
        label
    }}</label>
    
    <input
        :id="label"
        type="text"
        class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 sm:text-sm"
        v-model="modelValue"
        :placeholder="placeholder"
    />

    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
</template>
