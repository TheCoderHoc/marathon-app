"use client";
import Input from "@/components/Input";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { TaskGroupType } from "../types";
import useTaskGroup from "@/store/task-group-store";

type PropsType = {
    taskGroup: TaskGroupType;
};

export default function TaskGroup(props: PropsType) {
    const {
        taskGroup: { id, title, Icon = HiMiniBars3BottomLeft },
    } = props;

    const [isEditMode, setEditMode] = useState(true);

    const [groupTitle, setGroupTitle] = useState(title);

    const inputRef = useRef<HTMLInputElement>();

    const { activeTaskGroup, setActiveTaskGroup, editTaskGroup } =
        useTaskGroup();

    const active = activeTaskGroup === id;

    const handleInputBlur = () => {
        setEditMode(false);
        editTaskGroup(id, groupTitle);
    };

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            setEditMode(false);

            editTaskGroup(id, groupTitle);
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, []);

    return (
        <li
            className={`flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-gray-200 ${
                (isEditMode || active) && "bg-gray-200"
            } `}
            onClick={() => {
                setActiveTaskGroup(id);
            }}
        >
            <div
                className={`rounded-md py-2 px-2 ${
                    isEditMode ? "bg-gray-200" : "bg-inherit"
                }`}
            >
                <Icon size={20} className="text-blue-700" />
            </div>
            {isEditMode ? (
                <Input
                    value={groupTitle}
                    onChange={(e) => setGroupTitle(e.target.value)}
                    disabled={!isEditMode}
                    className={`bg-inherit cursor-default bg-white py-2 border-0 hover:cursor-pointer ${
                        isEditMode &&
                        "border-0 border-b-[3px] border-solid border-blue-700"
                    } focus:shadow-none disabled:text-black disabled:bg-inherit`}
                    ref={inputRef}
                    onBlur={handleInputBlur}
                    onKeyDown={handleInputKeyDown}
                    onClick={() => {
                        setActiveTaskGroup(id);
                    }}
                />
            ) : (
                <span>{groupTitle}</span>
            )}
        </li>
    );
}
