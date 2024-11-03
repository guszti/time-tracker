import type { TimeLog } from "@/common/interfaces";

export const isAllFilled = (timeLog: TimeLog) => {
    for (const key in timeLog) {
        if (key !== "id" && !timeLog[key as keyof TimeLog]) {
            return false;
        }
    }

    return true;
};

export const isTimeRangeValid = (timeLog: TimeLog) => {
    if (timeLog.from > timeLog.to) {
        return false;
    }

    return true;
};
