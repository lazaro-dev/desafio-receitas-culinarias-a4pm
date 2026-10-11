<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: true,
    },
});
</script>
<template>
    <div class="flex justify-center flex-col sm:mx-auto sm:w-full sm:max-w-md mb-4">
        <h3 class="font-bold text-xl pb-4 text-center text-orange-600">{{ title }}</h3>
        <slot></slot>
    </div>
</template>
