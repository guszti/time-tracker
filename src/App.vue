<script setup lang="ts">
import TimeLogForm from "@/components/TimeLogForm.vue";
import TimeLogCard from "@/components/TimeLogCard.vue";
import { onMounted, ref, watch } from "vue";
import type { TimeLog } from "@/common/interfaces";
import Feedback from "@/components/feedback/Feedback.vue";
import { useFeedback } from "@/components/feedback/composables/feedback-logic";

const timeLogs = ref<TimeLog[]>([]);
const { feedbackData, showFeedback } = useFeedback();
const shownDay = ref("");

onMounted(() => {
    const storedTimeLogs = localStorage.getItem("timeLogs") || "[]";

    timeLogs.value = JSON.parse(storedTimeLogs);
});

watch(
    timeLogs,
    newTimeLogs => {
        localStorage.setItem("timeLogs", JSON.stringify(newTimeLogs));
    },
    { deep: true },
);

const saveTimeLog = (timeLogData: TimeLog) => {
    // If there is no id, a new object is created
    // else, the existing one is updated
    if (!timeLogData.id) {
        timeLogs.value.push({
            ...timeLogData,
            id: Date.now(),
        });
    } else {
        timeLogs.value = timeLogs.value.map(timeLog => {
            if (timeLog.id === timeLogData.id) {
                return {
                    ...timeLogData,
                };
            }

            return timeLog;
        });
    }

    showFeedback("success", "Time log saved");
};

const deleteTimeLog = (id?: number) => {
    timeLogs.value = timeLogs.value.filter(timeLog => timeLog.id !== id);

    showFeedback("success", "Time log removed");
};
</script>

<template>
    <header></header>

    <main class="flex min-h-screen text-base bg-green-50">
        <div class="sm:max-w-xl m:mt-6 sm:ml-auto sm:mr-auto sm:w-3/4 p-6">
            <TimeLogForm @save-time-log="saveTimeLog" />
            <label class="block text-sm font-bold ml-1">Filter by day</label>
            <input
                v-model="shownDay"
                class="w-full border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                type="date"
                placeholder="Date"
                name="date"
                required
            />
            <br />
            <TimeLogCard
                v-for="timeLog in timeLogs"
                :key="timeLog.id"
                :timeLog="timeLog"
                :isVisible="shownDay ? timeLog.date === shownDay : true"
                @delete-time-log="deleteTimeLog"
                @save-time-log="saveTimeLog"
            />
            <Feedback :data="feedbackData" />
        </div>
    </main>
</template>
