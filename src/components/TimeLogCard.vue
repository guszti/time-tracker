<script setup lang="ts">
import type { TimeLog } from "@/interfaces";

defineProps<{ timeLog: TimeLog }>();
</script>

<template>
    <div>
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
            >
                Edit
            </button>
            <button
                class="w-2/5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Delete
            </button>
        </div>
    </div>
</template>
