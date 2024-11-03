import { defineStore } from "pinia";
import type { FeedbackData } from "@/common/interfaces";
import type { FeedbackTypes } from "@/common/types";

interface State {
    data: FeedbackData | null;
}

export const useFeedbackStore = defineStore("feedback", {
    state: (): State => ({
        data: null,
    }),
    actions: {
        showFeedback(type: FeedbackTypes, message: string) {
            this.data = { type, message };
        },
        resetData() {
            this.data = null;
        },
    },
});
