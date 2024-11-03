import type { TimeLog } from "@/common/interfaces";

export const validateTimeLog = (timeLog: TimeLog) => {
    for (const key in timeLog) {
        if (key !== "id" && !timeLog[key as keyof TimeLog]) {
            return false;
        }
    }
    return true;
};
