import { defaultTaskGroups } from "@/libs/task-groups";
import { TaskGroupType } from "@/types/task-group";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TaskGroupStateType = {
    taskGroups: TaskGroupType[];
    activeTaskGroupId: number;
};

const initialState: TaskGroupStateType = {
    taskGroups: defaultTaskGroups,
    activeTaskGroupId: 1,
};

const taskGroupSlice = createSlice({
    name: "taskGroup",
    initialState,
    reducers: {
        addTaskGroup: (state, action: PayloadAction<TaskGroupType>) => {
            const newTaskGroup = action.payload;
            state.taskGroups.push(newTaskGroup);
            state.activeTaskGroupId = newTaskGroup.id;
        },

        removeTaskGroup: (state, action: PayloadAction<number>) => {
            const taskGroupId = action.payload;

            state.taskGroups = state.taskGroups.filter(
                (group) => group.id !== taskGroupId
            );
        },

        editTaskGroup: (state, action: PayloadAction<TaskGroupType>) => {
            const newTaskGroupPayload = action.payload;

            state.taskGroups = state.taskGroups.map((group) => {
                if (group.id === newTaskGroupPayload.id) {
                    return { ...group, ...newTaskGroupPayload };
                }

                return group;
            });

            state.activeTaskGroupId = newTaskGroupPayload.id;
        },

        setActiveTaskGroupId: (state, action: PayloadAction<number>) => {
            const taskGroupId = action.payload;

            state.activeTaskGroupId = taskGroupId;
        },

        toggleGroupVisibility: (
            state,
            action: PayloadAction<{ groupId: number; isVisible: boolean }>
        ) => {
            const { groupId, isVisible } = action.payload;

            state.taskGroups = state.taskGroups.map((group) => {
                if (group.id === groupId) {
                    return { ...group, isVisible: isVisible };
                }

                return group;
            });
        },
    },
});

export const {
    addTaskGroup,
    removeTaskGroup,
    editTaskGroup,
    setActiveTaskGroupId,
    toggleGroupVisibility,
} = taskGroupSlice.actions;
export default taskGroupSlice.reducer;
