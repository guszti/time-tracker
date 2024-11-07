import { defineStore, storeToRefs } from "pinia";
import type { TimeLog } from "@/common/interfaces";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { useFilterStore } from "@/pinia/filter-store";

interface State {
    timeLogs: TimeLog[];
}
export const useTimeLogStore = defineStore("time-log", {
    state: (): State => ({
        timeLogs: [],
    }),
    getters: {
        getTimeFilteredTimeLogs(state) {
            const filterStore = useFilterStore();
            const { shownDay, isMonthly, isWeekly } = storeToRefs(filterStore);

            if (!shownDay.value) {
                return state.timeLogs;
            }

            if (isWeekly.value) {
                dayjs.extend(weekOfYear);

                const filterDate = dayjs(shownDay.value);

                return state.timeLogs.filter(timeLog => {
                    const timeLogDate = dayjs(timeLog.date);

                    return (
                        timeLogDate.year() === filterDate.year() &&
                        timeLogDate.week() === filterDate.week()
                    );
                });
            }

            if (isMonthly.value) {
                const filterDate = dayjs(shownDay.value);

                return state.timeLogs.filter(timeLog => {
                    const timeLogDate = dayjs(timeLog.date);

                    return (
                        timeLogDate.year() === filterDate.year() &&
                        timeLogDate.month() === filterDate.month()
                    );
                });
            }

            return state.timeLogs.filter(
                timeLog => timeLog.date === shownDay.value,
            );
        },
        getTagAndTimeFilteredTimeLogs(): TimeLog[] {
            const filterStore = useFilterStore();
            const timeFilteredTimeLogs = this.getTimeFilteredTimeLogs;

            return filterStore.tagFilter
                ? timeFilteredTimeLogs.filter(
                      timeLog => timeLog.tag === filterStore.tagFilter,
                  )
                : timeFilteredTimeLogs;
        },
        getSortedFilteredTimeLogs(): TimeLog[] {
            return this.getTagAndTimeFilteredTimeLogs.sort(
                (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime(),
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
