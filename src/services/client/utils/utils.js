import { Turns } from "@/models/types";

export const calculateDaysFromToday = (time) => {
    const date = new Date(time);
    const today = new Date();
    const timeDiff = date.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
};

export const checkTimeOfDay = (time) => {
    const date = new Date(time);
    const hour = date.getHours();

    if (hour >= 9 && hour <= 13) {
        return Turns.Morning;
    } else if (hour >= 16 && hour <= 20) {
        return Turns.Afternoon;
    }
}