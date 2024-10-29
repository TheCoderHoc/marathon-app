"use client";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { KeyboardEvent, useState } from "react";
import { BsCircle, BsThreeDots } from "react-icons/bs";
import { FiPlus, FiUserPlus } from "react-icons/fi";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import { TfiAlarmClock } from "react-icons/tfi";
import TaskItem from "./TaskItem";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeTaskItemView, openSidebarDrawer } from "@/redux/slices/ui.slice";
import { TaskItemType } from "../types/task.types";
import { addTask } from "@/redux/slices/tasks.slice";

export default function TaskListView() {
    const [isInputFocused, setInputFocused] = useState(false);
    const [taskInputValue, setTaskInputValue] = useState("");

    const dispatch = useAppDispatch();

    const { isSidebarDrawerOpen } = useAppSelector((state) => state.UI);

    const inputPlaceholder = isInputFocused
        ? "Try typing 'Pay utilities bill by Friday 6pm'"
        : "Add a task";

    const { taskGroups, activeTaskGroupId } = useAppSelector(
        (state) => state.taskGroup
    );

    const groupTitle = taskGroups.find(
        (group) => group.id === activeTaskGroupId
    )?.title;

    const { tasks } = useAppSelector((state) => state.task);

    const tasksToShow = tasks.filter((task) =>
        task.taskGroups.includes(activeTaskGroupId)
    );

    const handleAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            const newTask: TaskItemType = {
                id: Math.floor(Math.random() * 1000),
                title: taskInputValue,
                completed: false,
                starred: false,
                important: false,
                taskGroups: [1, 2, activeTaskGroupId],
                steps: [],
            };

            dispatch(addTask(newTask));

            setTaskInputValue("");

            dispatch(closeTaskItemView());
        }
    };

    return (
        <main className="bg-primary flex-1 py-8 px-8 flex flex-col">
            <header>
                <Button
                    icon={<HiOutlineBars3 size={24} />}
                    className="bg-transparent border-none shadow-none text-white md:hidden"
                    onClick={() => dispatch(openSidebarDrawer())}
                />

                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-semibold text-white">
                        {groupTitle}
                    </h2>

                    <div className="flex items-center gap-2">
                        <Button
                            icon={<FiUserPlus size={20} />}
                            className="bg-gray-100"
                        />
                        <Button
                            icon={
                                <BsThreeDots size={20} className="text-white" />
                            }
                            className="bg-transparent shadow-none border-none"
                        />
                    </div>
                </div>
            </header>

            <section className="flex flex-col gap-2 mt-5">
                {tasksToShow.map((task) => (
                    <TaskItem key={task.id} task={task} />
                ))}
            </section>

            <footer className="mt-auto bg-gray-100 px-3 p-2 rounded-md flex items-center gap-2">
                {isInputFocused ? <BsCircle size={24} /> : <FiPlus size={24} />}

                <Input
                    value={taskInputValue}
                    onChange={(e) => setTaskInputValue(e.target.value)}
                    placeholder={inputPlaceholder}
                    size="large"
                    className="bg-transparent border-none shadow-none"
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    suffix={
                        taskInputValue.length > 0 ? <TaskInputSuffix /> : null
                    }
                    onKeyDown={handleAddTask}
                />
            </footer>
        </main>
    );
}

function TaskInputSuffix() {
    return (
        <div className="flex items-center gap-2.5">
            <LiaCalendarWeekSolid size={24} />
            <TfiAlarmClock size={20} />
        </div>
    );
}
