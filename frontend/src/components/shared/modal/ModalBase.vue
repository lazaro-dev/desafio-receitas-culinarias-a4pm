<script setup lang="ts">
defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    title: {
        type: String,
        required: false,
    },
});

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => {
    emit("update:modelValue", false);
};
</script>

<template>
    <div
        v-show="modelValue"
        :class="[
            'fixed inset-0 flex items-center justify-center p-4 overflow-auto modal z-9999',
        ]"
    >
        <div
            class="bg-white rounded-lg shadow-xl w-full relative sm:max-w-lg flex flex-col"
        >
            <div class="p-4 border-b border-gray-200">
                <h2 class="text-2xl font-bold">{{ title ?? "" }}</h2>
            </div>
            <button
                @click="closeModal"
                class="absolute top-1 right-1 px-3 py-0 rounded-md text-black bg-transparent hover:text-red-500 text-5xl font-bold cursor-pointer"
                aria-label="Fechar"
            >
                ×
            </button>
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
