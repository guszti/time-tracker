<script setup lang="ts">
import CreateLogForm from "@/components/form/TimeLogForm.vue";
import TimeLogCard from "@/components/TimeLogCard.vue";
import { onMounted, ref, watch } from "vue";
import type { TimeLog } from "@/interfaces";

const timeLogs = ref<TimeLog[]>([]);

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

const saveTimeLog = (
    id: number | null,
    title: string,
    date: string,
    from: string,
    to: string,
    description: string,
    tag: string,
) => {
    const timeLogData = {
        title,
        date,
        from,
        to,
        description,
        tag,
    };

    // If there is no id, a new object is created
    // else, the existing one is updated
    if (!id) {
        timeLogs.value.push({
            id: Date.now(),
            ...timeLogData,
        });
    } else {
        console.log("asd");
        timeLogs.value = timeLogs.value.map(timeLog => {
            if (timeLog.id === id) {
                return {
                    id,
                    ...timeLogData,
                };
            }

            return timeLog;
        });
    }
};

const deleteTimeLog = (id: number) => {
    timeLogs.value = timeLogs.value.filter(timeLog => timeLog.id !== id);
};
</script>

<template>
    <header></header>

    <main class="flex min-h-screen text-base bg-green-50">
        <div class="sm:max-w-xl m:mt-6 sm:ml-auto sm:mr-auto sm:w-3/4 p-6">
            <CreateLogForm @save-time-log="saveTimeLog" />
            <TimeLogCard
                v-for="timeLog in timeLogs"
                :key="timeLog.id"
                :timeLog="timeLog"
                @delete-time-log="deleteTimeLog"
                @save-time-log="saveTimeLog"
            />
        </div>
    </main>
</template>
