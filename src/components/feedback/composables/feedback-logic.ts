import { ref } from "vue";
import type { FeedbackData } from "@/common/interfaces";
import type { FeedbackTypes } from "@/common/types";

export const useFeedback = () => {
    const feedbackData = ref<FeedbackData | null>(null);

    const showFeedback = (type: FeedbackTypes, message: string) => {
        feedbackData.value = { type, message };
    };

    return { feedbackData, showFeedback };
};
