import { TaskGroupType } from "@/app/dashboard/types";
import { StateCreator } from "zustand";

type TaskGroupState = {
    selectedTaskGroup: TaskGroupType | null;
};

type TaskGroupActions = {
    setSelectedTaskGroup: (taskGroup: TaskGroupType) => void;
};

export type TaskGroupSlice = TaskGroupState & TaskGroupActions;

export const createTaskGroupSlice: StateCreator<
    TaskGroupSlice,
    [],
    [],
    TaskGroupSlice
> = (set) => ({
    selectedTaskGroup: null,
    setSelectedTaskGroup: (taskGroup) =>
        set((state) => ({ ...state, selectedTaskGroup: taskGroup })),
});
