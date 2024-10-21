"use client";
import Input from "@/components/Input";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { TaskListType } from "../types";

type PropsType = {
    title: string;
    id: number;
    active: boolean;
    onSetActiveTaskList: (taskList: TaskListType) => void;
};

export default function TaskList(props: PropsType) {
    const { title, id, active, onSetActiveTaskList } = props;

    const [isEditMode, setEditMode] = useState(true);

    const [listTitle, setListTitle] = useState(title);

    const inputRef = useRef<HTMLInputElement>();

    const handleInputBlur = () => {
        setEditMode(false);
    };

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            setEditMode(false);
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <li
            className={`flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-gray-200 ${
                (isEditMode || active) && "bg-gray-200"
            } `}
            onClick={() => {
                onSetActiveTaskList({ title, id });
            }}
        >
            <div
                className={`rounded-md py-2 px-2 ${
                    isEditMode ? "bg-gray-200" : "bg-inherit"
                }`}
            >
                <HiMiniBars3BottomLeft size={20} className="text-blue-700" />
            </div>
            {isEditMode ? (
                <Input
                    value={listTitle}
                    onChange={(e) => setListTitle(e.target.value)}
                    disabled={!isEditMode}
                    className={`bg-inherit cursor-default bg-white py-2 border-0 hover:cursor-pointer ${
                        isEditMode &&
                        "border-0 border-b-[3px] border-solid border-blue-700"
                    } focus:shadow-none disabled:text-black disabled:bg-inherit`}
                    ref={inputRef}
                    onBlur={handleInputBlur}
                    onKeyDown={handleInputKeyDown}
                    onClick={() => {
                        onSetActiveTaskList({ title, id });
                    }}
                />
            ) : (
                <span>{listTitle}</span>
            )}
        </li>
    );
}
