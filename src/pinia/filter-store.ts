import { defineStore } from "pinia";

interface State {
    shownDay: string;
    isMonthly: boolean;
    isWeekly: boolean;
    tagFilter: string;
}

export const useFilterStore = defineStore("filter", {
    state: (): State => ({
        shownDay: "",
        isMonthly: false,
        isWeekly: false,
        tagFilter: "",
    }),
});
