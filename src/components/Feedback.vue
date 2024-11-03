<script setup lang="ts">
import { watch } from "vue";
import { useFeedbackStore } from "@/pinia/feedback-store";

const store = useFeedbackStore();

const popupColors = {
    success: "bg-green-400",
    error: "bg-red-400",
};

watch(
    () => store.data,
    () => {
        if (!store.data) {
            return;
        }

        setTimeout(() => {
            store.resetData();
        }, 2000);
    },
);
</script>

<template>
    <div
        v-if="!!store.data"
        class="sticky bottom-1 left-0 right-0 m-auto h-12 w-48 rounded-lg flex justify-center align-middle"
        :class="store.data?.type && popupColors[store.data?.type]"
    >
        <div class="m-auto">{{ store.data?.message }}</div>
    </div>
</template>
