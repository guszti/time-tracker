import type { FeedbackTypes } from "@/common/types";

export interface TimeLog {
    id: number;
    title: string;
    date: string;
    from: string;
    to: string;
    description: string;
    tag: string;
}

export interface FeedbackData {
    type: FeedbackTypes;
    message: string;
}
