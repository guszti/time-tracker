<script setup lang="ts">
import TimeLogForm from "@/components/TimeLogForm.vue";
import TimeLogCard from "@/components/TimeLogCard.vue";
import { onMounted, watch } from "vue";
import Feedback from "@/components/Feedback.vue";
import { useTimeLogStore } from "@/pinia/time-log-store";
import Filters from "@/components/Filters.vue";

const timeLogStore = useTimeLogStore();

onMounted(() => {
    const storedTimeLogs = localStorage.getItem("timeLogs") || "[]";

    timeLogStore.timeLogs = JSON.parse(storedTimeLogs);
});

watch(
    () => timeLogStore.timeLogs,
    newTimeLogs => {
        localStorage.setItem("timeLogs", JSON.stringify(newTimeLogs));
    },
    { deep: true },
);
</script>

<template>
    <header></header>

    <main class="flex min-h-screen text-base bg-green-50">
        <div class="sm:max-w-xl m:mt-6 sm:ml-auto sm:mr-auto sm:w-3/4 p-6">
            <TimeLogForm />
            <Filters />
            <TimeLogCard
                v-for="timeLog in timeLogStore.getFilteredTimeLogs.sort(
                    (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime(),
                )"
                :key="timeLog.id"
                :timeLog="timeLog"
            />
            <Feedback />
        </div>
    </main>
</template>
