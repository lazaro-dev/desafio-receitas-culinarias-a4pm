<script setup lang="ts">
import { computed } from "vue";

type ButtonType = "button" | "submit" | "reset";
type ColorType = "primary" | "secondary" | "danger" | "success" | string;

const props = withDefaults(
    defineProps<{
        type?: ButtonType;
        disabled?: boolean;
        colorType: ColorType;
    }>(),
    {
        type: "button",
        disabled: false,
        colorType: "primary",
    }
);

const colorTypeClasses = computed(() => {
    const variants: Record<string, string> = {
        primary: "bg-orange-600 text-white hover:bg-emerald-700",
        secondary: "bg-blue-600 text-white hover:bg-opacity-90",
        danger: "bg-red-600 text-white hover:bg-opacity-90",
        success: "bg-green-600 text-white hover:bg-opacity-90",
    };

    if (props.colorType in variants) {
        return variants[props.colorType];
    }

    return props.colorType;
});
</script>

<template>
    <button
        :type="type"
        :disabled="disabled"
        :class="[
            'border border-transparent rounded-lg shadow-sm cursor-pointer',
            colorTypeClasses,
            { 'opacity-50 cursor-not-allowed': disabled },
        ]"
    >
        <slot></slot>
    </button>
</template>
