import type { TimeLog } from "@/common/interfaces";

export const isAllFilled = (timeLog: Partial<TimeLog>) => {
    for (const key in timeLog) {
        if (key !== "id" && !timeLog[key as keyof TimeLog]) {
            return false;
        }
    }

    return true;
};

export const isTimeRangeValid = (timeLog: Partial<TimeLog>) => {
    if (timeLog.from && timeLog.to && timeLog.from > timeLog.to) {
        return false;
    }

    return true;
};
