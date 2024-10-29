import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TaskItemType } from "@/app/dashboard/types/task.types";

type UIStateType = {
    isTaskItemViewOpen: boolean;
    selectedTaskToView: TaskItemType | null;
};

const initialState = {
    isTaskItemViewOpen: false,
    selectedTaskToView: null,
} satisfies UIStateType as UIStateType;

const UISlice = createSlice({
    name: "UI",
    initialState,
    reducers: {
        openTaskItemView: (state, action: PayloadAction<TaskItemType>) => {
            state.isTaskItemViewOpen = true;
            state.selectedTaskToView = action.payload;
        },

        closeTaskItemView: (state) => {
            state.isTaskItemViewOpen = false;
            state.selectedTaskToView = null;
        },
    },
});

export const { openTaskItemView, closeTaskItemView } = UISlice.actions;
export default UISlice.reducer;
