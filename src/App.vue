<script setup lang="ts">
import CreateLogForm from "@/components/form/CreateLogForm.vue";
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
    title: string,
    date: string,
    from: string,
    to: string,
    description: string,
    tag: string,
) => {
    timeLogs.value.push({
        id: Date.now(),
        title,
        date,
        from,
        to,
        description,
        tag,
    });
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
            <br />
            <TimeLogCard
                v-for="timeLog in timeLogs"
                :key="timeLog.id"
                :timeLog="timeLog"
                @delete-time-log="deleteTimeLog"
            />
        </div>
    </main>
</template>
