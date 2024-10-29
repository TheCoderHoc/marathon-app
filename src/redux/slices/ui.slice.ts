import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { TaskItemType } from "@/app/dashboard/types/task.types";

type UIStateType = {
    isTaskItemViewOpen: boolean;
    selectedTaskToView: TaskItemType | null;
    isSidebarDrawerOpen: boolean;
};

const initialState = {
    isTaskItemViewOpen: false,
    selectedTaskToView: null,
    isSidebarDrawerOpen: false,
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

        openSidebarDrawer: (state) => {
            state.isSidebarDrawerOpen = true;
        },

        closeSidebarDrawer: (state) => {
            state.isSidebarDrawerOpen = false;
        },
    },
});

export const {
    openTaskItemView,
    closeTaskItemView,
    openSidebarDrawer,
    closeSidebarDrawer,
} = UISlice.actions;
export default UISlice.reducer;
