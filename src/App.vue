<script setup lang="ts">
import TimeLogForm from "@/components/TimeLogForm.vue";
import TimeLogCard from "@/components/TimeLogCard.vue";
import { onMounted, ref, watch } from "vue";
import Feedback from "@/components/Feedback.vue";
import { useTimeLogStore } from "@/pinia/time-log-store";

const shownDay = ref("");

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
                v-for="timeLog in timeLogStore.timeLogs"
                :key="timeLog.id"
                :timeLog="timeLog"
                :isVisible="shownDay ? timeLog.date === shownDay : true"
            />
            <Feedback />
        </div>
    </main>
</template>
