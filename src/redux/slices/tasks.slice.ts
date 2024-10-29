import { TaskItemType } from "@/app/dashboard/types/task.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TaskStateType = {
    tasks: TaskItemType[];
};

const initialState: TaskStateType = {
    tasks: [],
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskItemType>) => {
            const newTask = action.payload;

            state.tasks.push(newTask);
        },

        removeTask: (state, action: PayloadAction<number>) => {
            const taskId = action.payload;

            state.tasks = state.tasks.filter((task) => task.id !== taskId);
        },

        toggleTaskCompletion: (state, action: PayloadAction<number>) => {
            const taskId = action.payload;

            state.tasks.map((task) => {
                if (task.id === taskId) {
                    return { ...task, completed: !task.completed };
                }

                return task;
            });
        },

        duplicateTasks: (state, action: PayloadAction<TaskItemType[]>) => {
            const tasks = action.payload;

            state.tasks = [...state.tasks, ...tasks];
        },
    },
});

export const { addTask, removeTask, toggleTaskCompletion, duplicateTasks } =
    taskSlice.actions;
export default taskSlice.reducer;
