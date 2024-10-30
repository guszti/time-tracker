<script setup lang="ts">
import CreateLogForm from "@/components/form/CreateLogForm.vue";
import TimeLogCard from "@/components/TimeLogCard.vue";
import { ref } from "vue";
import type { TimeLog } from "@/interfaces";

const timeLogs = ref<TimeLog[]>([]);

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
</script>

<template>
    <header></header>

    <main class="flex bg-teal-200 min-h-screen text-base">
        <div class="m:mt-6 sm:ml-auto sm:mr-auto w-full sm:w-3/4 p-6">
            <CreateLogForm @save-time-log="saveTimeLog" />
            <br />
            <TimeLogCard
                v-for="timeLog in timeLogs"
                :key="timeLog.id"
                :timeLog="timeLog"
            />
        </div>
    </main>
</template>
