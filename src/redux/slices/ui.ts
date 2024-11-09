import { createSlice } from "@reduxjs/toolkit";

type UIStateType = {
    isTaskItemViewOpen: boolean;
    isSidebarDrawerOpen: boolean;
};

const initialState = {
    isTaskItemViewOpen: false,
    isSidebarDrawerOpen: false,
} satisfies UIStateType as UIStateType;

const UISlice = createSlice({
    name: "UI",
    initialState,
    reducers: {
        openTaskItemView: (state) => {
            state.isTaskItemViewOpen = true;
        },

        closeTaskItemView: (state) => {
            state.isTaskItemViewOpen = false;
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
