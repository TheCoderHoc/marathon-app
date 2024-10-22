import { create } from "zustand";
import defaultTaskGroups from "@/app/dashboard/lib/default-task-groups";
import { TaskGroupType } from "@/app/dashboard/types";

type TaskGroupsState = {
    taskGroups: TaskGroupType[];
    activeTaskGroup: number;
    addTaskGroup: (taskGroup: TaskGroupType) => void;
    editTaskGroup: (id: number, title: string) => void;
    deleteTaskGroup: (id: number) => void;
    setActiveTaskGroup: (id: number) => void;
};

const useTaskGroup = create<TaskGroupsState>((set) => ({
    taskGroups: defaultTaskGroups,
    activeTaskGroup: 1,
    addTaskGroup: (taskGroup) =>
        set((state) => ({
            taskGroups: [...state.taskGroups, taskGroup],
            activeTaskGroup: taskGroup.id,
        })),
    editTaskGroup: (id, title) =>
        set((state) => ({
            taskGroups: state.taskGroups.map((group) => {
                if (group.id === id) {
                    return { ...group, title };
                }

                return group;
            }),
            activeTaskGroup: id,
        })),
    deleteTaskGroup: (id) =>
        set((state) => ({
            taskGroups: state.taskGroups.filter((group) => group.id !== id),
        })),
    setActiveTaskGroup: (id) => set(() => ({ activeTaskGroup: id })),
}));

export default useTaskGroup;
