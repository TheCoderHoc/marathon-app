import { TaskItemType } from "@/types/task.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TaskStateType = {
    tasks: TaskItemType[];
    activeTaskId?: number;
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

        editTask: (state, action: PayloadAction<TaskItemType>) => {
            const taskToEdit = action.payload;

            state.tasks = state.tasks.map((task) => {
                if (task.id === taskToEdit.id) {
                    return taskToEdit;
                }

                return task;
            });
        },

        removeTask: (state, action: PayloadAction<number>) => {
            const taskId = action.payload;

            state.tasks = state.tasks.filter((task) => task.id !== taskId);
        },

        toggleTaskCompletion: (state, action: PayloadAction<number>) => {
            const taskId = action.payload;

            state.tasks = state.tasks.map((task) => {
                if (task.id === taskId) {
                    return { ...task, completed: !task.completed };
                }

                return task;
            });
        },

        toggleTaskGroup: (
            state,
            action: PayloadAction<{ taskId: number; groupId: number }>
        ) => {
            const { taskId, groupId } = action.payload;

            state.tasks = state.tasks.map((task) => {
                if (task.id === taskId) {
                    if (task.taskGroups.includes(groupId)) {
                        const index = task.taskGroups.indexOf(groupId);
                        task.taskGroups.splice(index, 1);
                        return task;
                    }

                    task.taskGroups.push(groupId);
                    return task;
                }

                return task;
            });
        },

        duplicateTasks: (state, action: PayloadAction<TaskItemType[]>) => {
            const tasks = action.payload;

            state.tasks = [...state.tasks, ...tasks];
        },

        addActiveTask: (state, action: PayloadAction<number>) => {
            state.activeTaskId = action.payload;
        },
    },
});

export const {
    addTask,
    removeTask,
    editTask,
    toggleTaskCompletion,
    toggleTaskGroup,
    duplicateTasks,
    addActiveTask,
} = taskSlice.actions;
export default taskSlice.reducer;
