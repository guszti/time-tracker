<script setup lang="ts">
import { ref } from "vue";
import type { TimeLog, TimeLogSubmitEvent } from "@/common/interfaces";

const { timeLog } = defineProps<{ timeLog?: TimeLog }>();

interface Emits extends TimeLogSubmitEvent {
    (e: "cancel-edit"): void;
}

const emit = defineEmits<Emits>();

const title = ref(timeLog?.title ?? "");
const date = ref(timeLog?.date ?? "");
const from = ref(timeLog?.from ?? "");
const to = ref(timeLog?.to ?? "");
const description = ref(timeLog?.description ?? "");
const tag = ref(timeLog?.tag ?? "");

const handleSubmit = () => {
    emit("save-time-log", {
        id: timeLog?.id,
        title: title.value,
        date: date.value,
        from: from.value,
        to: to.value,
        description: description.value,
        tag: tag.value,
    });

    if (timeLog?.id) {
        emit("cancel-edit");
    } else {
        clearForm();
    }
};

const clearForm = () => {
    title.value = "";
    date.value = "";
    from.value = "";
    to.value = "";
    description.value = "";
    tag.value = "";
};

const tags = ["projectA", "projectB", "client"];
</script>

<template>
    <form
        class="mb-10 bg-green-200 pl-2 pr-2 pt-2 pb-4 rounded-lg"
        @submit.prevent="handleSubmit"
    >
        <h1 v-if="!timeLog?.id" class="text-center font-bold text-3xl">
            Create a new log
        </h1>
        <h1 v-else class="text-center font-bold text-3xl">
            Editing "{{ timeLog?.title }}"
        </h1>
        <div class="flex justify-center mb-6">
            <div class="w-full">
                <label class="text-sm font-bold ml-1">Title</label>
                <input
                    v-model="title"
                    class="w-full border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    type="text"
                    name="name"
                    required
                />
            </div>
        </div>
        <fieldset class="flex justify-center mb-6">
            <div class="flex justify-between w-full">
                <div class="w-1/3">
                    <label class="block text-sm font-bold ml-1">Date</label>
                    <input
                        v-model="date"
                        class="w-full border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        type="date"
                        placeholder="Date"
                        name="date"
                        required
                    />
                </div>
                <div class="w-1/4">
                    <label class="block text-sm font-bold ml-1">From</label>
                    <input
                        v-model="from"
                        class="w-full border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        type="time"
                        placeholder="From"
                        name="from"
                        value="00:00"
                        required
                    />
                </div>
                <div class="w-1/4">
                    <label class="block text-sm font-bold ml-1">To</label>
                    <input
                        v-model="to"
                        class="w-full border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                        type="time"
                        placeholder="Title"
                        name="to"
                        value="00:00"
                        :min="from"
                        required
                    />
                </div>
            </div>
        </fieldset>
        <div class="flex justify-center">
            <div class="w-full">
                <label class="text-sm font-bold ml-1">Description</label>
                <div class="mb-6">
                    <textarea
                        v-model="description"
                        class="w-full h-28 p-2.5 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        name="description"
                        required
                    />
                </div>
            </div>
        </div>
        <div class="flex mb-6">
            <div>
                <label class="block text-sm font-bold ml-1">Tag</label>
                <select
                    v-model="tag"
                    class="w-40 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    name="name"
                >
                    <option value="">Choose a tag</option>
                    <option v-for="tag in tags" :key="tag">{{ tag }}</option>
                </select>
            </div>
        </div>
        <fieldset class="flex justify-center">
            <div class="flex justify-between w-80">
                <input
                    class="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    value="Save"
                    @click="handleSubmit"
                />
                <input
                    v-if="!timeLog?.id"
                    class="w-32 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    value="Clear"
                    @click="clearForm"
                />
                <input
                    v-else
                    class="w-32 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    value="Cancel"
                    @click="$emit('cancel-edit')"
                />
            </div>
        </fieldset>
    </form>
</template>

<style scoped></style>
