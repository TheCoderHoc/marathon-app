import { TaskItemType } from "@/app/dashboard/types";
import { create } from "zustand";

type TaskState = {
    tasks: TaskItemType[];
    addTask: (task: TaskItemType) => void;
    removeTask: (id: number) => void;
    toggleTaskCompletion: (id: number) => void;
    // editTask: (id: number, payload: TaskItemType) => void;
};

const useTask = create<TaskState>((set) => ({
    tasks: [],
    addTask: (task) =>
        set((state) => ({
            tasks: [...state.tasks, task],
        })),
    removeTask: (id) =>
        set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
        })),
    toggleTaskCompletion: (id) =>
        set((state) => ({
            tasks: state.tasks.map((task) => {
                if (task.id === id) {
                    return { ...task, completed: !task.completed };
                }

                return task;
            }),
        })),
}));

export default useTask;
