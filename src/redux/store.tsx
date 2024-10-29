import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UIReducer from "./slices/ui.slice";
import TaskReducer from "./slices/tasks.slice";
import TaskGroupReducer from "./slices/task-group.slice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const store = configureStore({
    reducer: combineReducers({
        UI: UIReducer,
        task: TaskReducer,
        taskGroup: TaskGroupReducer,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
