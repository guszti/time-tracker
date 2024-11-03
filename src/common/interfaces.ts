import type { FeedbackTypes } from "@/common/types";

export interface TimeLog {
    id?: number;
    title: string;
    date: string;
    from: string;
    to: string;
    description: string;
    tag: string;
}

export interface TimeLogSubmitEvent {
    (e: "save-time-log", timeLog: TimeLog): void;
}

export interface FeedbackData {
    type: FeedbackTypes;
    message: string;
}
