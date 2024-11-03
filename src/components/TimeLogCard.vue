<script setup lang="ts">
import type { TimeLog } from "@/common/interfaces";
import { ref } from "vue";
import TimeLogForm from "@/components/TimeLogForm.vue";
import { useTimeLogStore } from "@/pinia/time-log-store";
import { useFeedbackStore } from "@/pinia/feedback-store";

defineProps<{ timeLog: TimeLog; isVisible: boolean }>();

const timeLogStore = useTimeLogStore();
const feedbackStore = useFeedbackStore();

const isEditing = ref(false);

const handleDelete = (id: number) => {
    timeLogStore.deleteTimeLog(id);
    feedbackStore.showFeedback("success", "Time log removed");
};
</script>

<template>
    <TimeLogForm
        v-if="isEditing"
        :timeLog="timeLog"
        @cancel-edit="isEditing = false"
    />
    <div
        v-else-if="isVisible"
        class="mb-10 bg-green-200 pl-2 pr-2 pt-2 pb-4 rounded-lg"
    >
        <div class="flex justify-between w-full mb-2 font-bold">
            <div>
                <div class="font-bold text-xl max-w-64">
                    {{ timeLog.title }}
                </div>
                <small class="block mb-2 font-bold">{{ timeLog.tag }}</small>
            </div>
            <div>
                <small class="block">{{ timeLog.date }}</small>
                <small class="block"
                    >{{ timeLog.from }} - {{ timeLog.to }}</small
                >
            </div>
        </div>
        <p class="mb-2">
            {{ timeLog.description }}
        </p>

        <div class="flex justify-around">
            <button
                class="w-2/5 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                @click="isEditing = true"
            >
                Edit
            </button>
            <button
                class="w-2/5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                @click="handleDelete(timeLog.id)"
            >
                Delete
            </button>
        </div>
    </div>
</template>
