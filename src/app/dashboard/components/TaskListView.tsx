"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { KeyboardEvent, useState } from "react";
import { BsCircle, BsThreeDots } from "react-icons/bs";
import { FiPlus, FiUserPlus } from "react-icons/fi";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import { TfiAlarmClock } from "react-icons/tfi";
import { TaskItemType } from "../types";
import TaskItem from "./TaskItem";
import useTaskGroup from "@/store/task-group-store";

export default function TaskListView() {
    const [tasks, setTasks] = useState<TaskItemType[]>([]);
    const [isInputFocused, setInputFocused] = useState(false);
    const [taskInputValue, setTaskInputValue] = useState("");

    const inputPlaceholder = isInputFocused
        ? "Try typing 'Pay utilities bill by Friday 6pm'"
        : "Add a task";

    const { taskGroups, activeTaskGroup } = useTaskGroup();

    const groupTitle = taskGroups.find(
        (group) => group.id === activeTaskGroup
    )?.title;

    const tasksToShow = tasks.filter((task) =>
        task.taskGroups.includes(activeTaskGroup)
    );

    const handleAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            const newTask = {
                id: Math.floor(Math.random() * 1000),
                title: taskInputValue,
                completed: false,
                starred: false,
                important: false,
                taskGroups: [1, 2, activeTaskGroup],
            };

            setTasks([...tasks, newTask]);
            setTaskInputValue("");
        }
    };
    return (
        <main className="bg-blue-600 flex-1 py-8 px-12 flex flex-col">
            <header className="flex items-center justify-between">
                <h2 className="text-3xl font-semibold text-white">
                    {groupTitle}
                </h2>

                <div className="flex items-center gap-2">
                    <Button
                        icon={<FiUserPlus size={20} />}
                        className="bg-gray-100"
                    />
                    <Button
                        icon={<BsThreeDots size={20} className="text-white" />}
                        className="bg-transparent shadow-none border-none"
                    />
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
