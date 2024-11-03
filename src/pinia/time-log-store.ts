import { defineStore } from "pinia";
import type { TimeLog } from "@/common/interfaces";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

interface State {
    timeLogs: TimeLog[];
}

export const useTimeLogStore = defineStore("time-log", {
    state: (): State => ({
        timeLogs: [],
    }),
    getters: {
        getFilteredTimeLogs:
            state =>
            (
                tagFilter: string,
                date: string,
                isWeekly: boolean,
                isMonthly: boolean,
            ) => {
                if (!date) {
                    return state.timeLogs.filter(timeLog =>
                        tagFilter ? timeLog.tag === tagFilter : true,
                    );
                }

                if (isWeekly) {
                    dayjs.extend(weekOfYear);

                    const filterDate = dayjs(date);

                    return state.timeLogs.filter(timeLog => {
                        const timeLogDate = dayjs(timeLog.date);

                        return (
                            timeLogDate.year() === filterDate.year() &&
                            timeLogDate.week() === filterDate.week() &&
                            (tagFilter ? timeLog.tag === tagFilter : true)
                        );
                    });
                }

                if (isMonthly) {
                    const filterDate = dayjs(date);

                    return state.timeLogs.filter(timeLog => {
                        const timeLogDate = dayjs(timeLog.date);

                        return (
                            timeLogDate.year() === filterDate.year() &&
                            timeLogDate.month() === filterDate.month() &&
                            (tagFilter ? timeLog.tag === tagFilter : true)
                        );
                    });
                }

                return state.timeLogs.filter(
                    timeLog =>
                        timeLog.date === date &&
                        (tagFilter ? timeLog.tag === tagFilter : true),
                );
            },
    },
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
