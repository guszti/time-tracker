<script setup lang="ts">
import type { FeedbackTypes } from "@/types";

defineProps<{ type: FeedbackTypes }>();

const messageMap = {
    success: "Success",
    error: "Something went wrong",
};
</script>

<template>
    <div
        v-if="type"
        class="sticky bottom-1 left-0 right-0 m-auto h-12 w-48 rounded-lg flex justify-center align-middle"
        :class="{
            'bg-green-400': type === 'success',
            'bg-red-400': type === 'error',
        }"
    >
        <div class="m-auto">{{ messageMap[type] }}</div>
    </div>
</template>
