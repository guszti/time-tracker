<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
    (
        e: "save-time-log",
        title: string,
        date: string,
        from: string,
        to: string,
        description: string,
        tag: string,
    ): void;
}>();

const title = ref("");
const date = ref("");
const from = ref("");
const to = ref("");
const description = ref("");
const tag = ref("");

const handleSubmit = () => {
    emit(
        "save-time-log",
        title.value,
        date.value,
        from.value,
        to.value,
        description.value,
        tag.value,
    );

    clearForm();
};

const clearForm = () => {
    title.value = "";
    date.value = "";
    from.value = "";
    to.value = "";
    description.value = "";
    tag.value = "";
};

const cancel = () => {
    console.log("cancelled");
};

const tags = ["projectA", "projectB", "client"];
</script>

<template>
    <form class="sm:border border-black" @submit.prevent="handleSubmit">
        <div class="flex justify-center">
            <div>
                <label class="text-sm font-bold ml-1">Title</label>
                <div class="mb-6">
                    <input
                        v-model="title"
                        class="w-80"
                        type="text"
                        name="name"
                        required
                    />
                </div>
            </div>
        </div>
        <fieldset class="flex justify-center mb-6">
            <div class="flex justify-between w-80">
                <div>
                    <label class="block text-sm font-bold ml-1">Date</label>
                    <input
                        v-model="date"
                        class="w-28 bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="date"
                        placeholder="Date"
                        name="date"
                        required
                    />
                </div>
                <div>
                    <label class="block text-sm font-bold ml-1">From</label>
                    <input
                        v-model="from"
                        class="w-20 bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="time"
                        placeholder="From"
                        name="from"
                        value="00:00"
                        required
                    />
                </div>
                <div>
                    <label class="block text-sm font-bold ml-1">To</label>
                    <input
                        v-model="to"
                        class="w-20 bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <div>
                <label class="text-sm font-bold ml-1">Description</label>
                <div class="mb-6">
                    <textarea
                        v-model="description"
                        class="w-80"
                        name="description"
                        required
                    />
                </div>
            </div>
        </div>
        <div class="flex justify-center mb-6">
            <div>
                <label class="block text-sm font-bold ml-1">Tag</label>
                <select v-model="tag" class="w-40" type="text" name="name">
                    <option value="">Choose a tag</option>
                    <option v-for="tag in tags" :key="tag">{{ tag }}</option>
                </select>
            </div>
        </div>
        <fieldset class="flex justify-center">
            <div class="flex justify-between w-80">
                <input
                    class="w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    value="Save"
                    @click="handleSubmit"
                />
                <input
                    class="w-24 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    value="Clear"
                    @click="clearForm"
                />
                <input
                    class="w-24 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    type="button"
                    value="Cancel"
                    @click="cancel"
                />
            </div>
        </fieldset>
    </form>
</template>

<style scoped></style>
