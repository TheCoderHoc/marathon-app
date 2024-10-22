import { StoreType } from "@/types/store";
import { create } from "zustand";
import { createTaskGroupSlice } from "./active-list.slice";
import { immer } from "zustand/middleware/immer";

export const useStore = create<StoreType>()(
    immer((...a) => ({
        ...createTaskGroupSlice(...a),
    }))
);
