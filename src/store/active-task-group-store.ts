import { TaskGroupType } from "@/app/dashboard/types";
import { create } from "zustand";

type TaskGroupState = {
    activeTaskGroup: TaskGroupType | null;
    setActiveTaskGroup: (taskGroup: TaskGroupType) => void;
};

const useActiveTaskGroupStore = create<TaskGroupState>((set) => ({
    activeTaskGroup: null,
    setActiveTaskGroup: (taskGroup) =>
        set((state) => ({ activeTaskGroup: taskGroup })),
}));

export default useActiveTaskGroupStore;
