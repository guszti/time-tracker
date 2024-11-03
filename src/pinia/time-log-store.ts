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
        saveTimeLog(timeLogData: TimeLog) {
            // If there is no id, a new object is created
            // else, the existing one is updated
            if (!timeLogData.id) {
                this.timeLogs.push({
                    ...timeLogData,
                    id: Date.now(),
                });
            } else {
                this.timeLogs = this.timeLogs.map(timeLog => {
                    if (timeLog.id === timeLogData.id) {
                        return {
                            ...timeLogData,
                        };
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
