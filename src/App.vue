<script setup lang="ts">
import TimeLogForm from "@/components/form/TimeLogForm.vue";
import TimeLogCard from "@/components/TimeLogCard.vue";
import { onMounted, ref, watch } from "vue";
import type { TimeLog } from "@/interfaces";
import Feedback from "@/components/Feedback.vue";
import type { FeedbackTypes } from "@/types";
import { validateTimeLog } from "@/services/validation";

const timeLogs = ref<TimeLog[]>([]);
const feedbackType = ref<FeedbackTypes>("");

onMounted(() => {
    const storedTimeLogs = localStorage.getItem("timeLogs") || "[]";

    timeLogs.value = JSON.parse(storedTimeLogs);
});

const showFeedback = (type: FeedbackTypes) => {
    feedbackType.value = type;

    setTimeout(() => {
        feedbackType.value = "";
    }, 2000);
};

watch(
    timeLogs,
    newTimeLogs => {
        localStorage.setItem("timeLogs", JSON.stringify(newTimeLogs));
    },
    { deep: true },
);

const saveTimeLog = (timeLogData: TimeLog) => {
    if (!validateTimeLog(timeLogData)) {
        showFeedback("error");

        return;
    }

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

    showFeedback("success");
};

const deleteTimeLog = (id: number) => {
    timeLogs.value = timeLogs.value.filter(timeLog => timeLog.id !== id);

    showFeedback("success");
};
</script>

<template>
    <header></header>

    <main class="flex min-h-screen text-base bg-green-50">
        <div class="sm:max-w-xl m:mt-6 sm:ml-auto sm:mr-auto sm:w-3/4 p-6">
            <TimeLogForm @save-time-log="saveTimeLog" />
            <TimeLogCard
                v-for="timeLog in timeLogs"
                :key="timeLog.id"
                :timeLog="timeLog"
                @delete-time-log="deleteTimeLog"
                @save-time-log="saveTimeLog"
            />
            <Feedback :type="feedbackType" />
        </div>
    </main>
</template>
