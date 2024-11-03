<script setup lang="ts">
import TimeLogForm from "@/components/TimeLogForm.vue";
import TimeLogCard from "@/components/TimeLogCard.vue";
import { onMounted, ref, watch } from "vue";
import Feedback from "@/components/Feedback.vue";
import { useTimeLogStore } from "@/pinia/time-log-store";
import { tags } from "@/common/constants";

const shownDay = ref("");
const isMonthly = ref(false);
const tagFilter = ref("");

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
                class="mb-2 w-full border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                type="date"
                name="date"
            />
            <div class="mb-2" v-if="!!shownDay">
                <input
                    type="checkbox"
                    v-model="isMonthly"
                    class="mb-6 w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-blue-300 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                />
                <label for="remember" class="ms-2 text-sm font-medium"
                    >Show the whole month for selected date</label
                >
            </div>
            <label class="block text-sm font-bold ml-1">Filter by tag</label>
            <select
                v-model="tagFilter"
                class="mb-4 w-40 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                name="name"
            >
                <option value="">Select tag</option>
                <option v-for="tag in tags" :key="tag">{{ tag }}</option>
            </select>
            <TimeLogCard
                v-for="timeLog in timeLogStore.getFilteredTimeLogs(
                    tagFilter,
                    shownDay,
                    isMonthly,
                )"
                :key="timeLog.id"
                :timeLog="timeLog"
            />
            <Feedback />
        </div>
    </main>
</template>
