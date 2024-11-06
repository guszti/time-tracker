<script setup lang="ts">
import { tags } from "@/common/constants";
import { useFilterStore } from "@/pinia/filter-store";
import { storeToRefs } from "pinia";

const filterStore = useFilterStore();
const { shownDay, isMonthly, isWeekly, tagFilter } = storeToRefs(filterStore);
</script>

<template>
    <input
        v-model="shownDay"
        class="mb-2 w-full border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        type="date"
        name="date"
    />
    <div class="mb-2" v-if="!!shownDay && !isMonthly">
        <input
            type="checkbox"
            v-model="isWeekly"
            class="mb-6 w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-blue-300 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
        />
        <label for="remember" class="ms-2 text-sm font-medium"
            >Show the whole week for selected date</label
        >
    </div>
    <div class="mb-2" v-if="!!shownDay && !isWeekly">
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
</template>
