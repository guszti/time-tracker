import { defineStore } from "pinia";
import type { TimeLog } from "@/common/interfaces";

interface State {
    timeLogs: TimeLog[];
}

export const useTimeLogStore = defineStore("time-log", {
    state: (): State => ({
        timeLogs: [],
    }),
    actions: {
        saveTimeLog(timeLogData: TimeLog | Partial<TimeLog>) {
            const newTimeLog = {
                ...timeLogData,
                id: timeLogData.id ?? Date.now(),
            } as TimeLog;

            // If there is no id, a new object is created
            // else, the existing one is updated
            if (!timeLogData.id) {
                this.timeLogs.push(newTimeLog);
            } else {
                this.timeLogs = this.timeLogs.map(timeLog => {
                    if (timeLog.id === timeLogData.id) {
                        return newTimeLog;
                    }

                    return timeLog;
                });
            }
        },
        deleteTimeLog(id: number) {
            this.timeLogs = this.timeLogs.filter(timeLog => timeLog.id !== id);
        },
    },
});
