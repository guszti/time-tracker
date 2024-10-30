<script setup lang="ts">
import CreateLogForm from "@/components/form/CreateLogForm.vue";
import TimeLogCard from "@/components/TimeLogCard.vue";
</script>

<template>
    <header></header>

    <main class="flex bg-teal-200 min-h-screen text-base">
        <div class="m:mt-6 sm:ml-auto sm:mr-auto w-full sm:w-3/4 p-6">
            <CreateLogForm />
            <br />
            <TimeLogCard />
            <TimeLogCard />
            <TimeLogCard />
        </div>
    </main>
</template>
