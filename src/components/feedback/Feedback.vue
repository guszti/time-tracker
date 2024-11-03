<script setup lang="ts">
import type { FeedbackData } from "@/interfaces";
import { ref, watch } from "vue";

const { data } = defineProps<{ data: FeedbackData | null }>();

const isShown = ref(false);

const popupColors = {
    success: "bg-green-400",
    error: "bg-red-400",
};

watch(
    () => data,
    () => {
        isShown.value = true;

        setTimeout(() => {
            isShown.value = false;
        }, 2000);
    },
);
</script>

<template>
    <div
        v-if="isShown"
        class="sticky bottom-1 left-0 right-0 m-auto h-12 w-48 rounded-lg flex justify-center align-middle"
        :class="data?.type && popupColors[data?.type]"
    >
        <div class="m-auto">{{ data?.message }}</div>
    </div>
</template>
