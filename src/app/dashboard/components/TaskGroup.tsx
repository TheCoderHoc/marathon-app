"use client";
import Input from "@/components/Input";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { TaskGroupType } from "../types";
import useActiveTaskGroupStore from "@/store/active-task-group-store";

type PropsType = {
    taskGroup: TaskGroupType;
    onEditTaskGroup: (id: number, title: string) => void;
};

export default function TaskGroup(props: PropsType) {
    const {
        taskGroup: { id, title },
        onEditTaskGroup,
    } = props;

    const [isEditMode, setEditMode] = useState(true);

    const [groupTitle, setGroupTitle] = useState(title);

    const inputRef = useRef<HTMLInputElement>();

    const { activeTaskGroup, setActiveTaskGroup } = useActiveTaskGroupStore();

    const active = activeTaskGroup?.id === id;

    const handleInputBlur = () => {
        setEditMode(false);
        onEditTaskGroup(id, groupTitle);
        setActiveTaskGroup({ id, title: groupTitle });
    };

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            setEditMode(false);
            onEditTaskGroup(id, groupTitle);
            setActiveTaskGroup({ id, title: groupTitle });
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
                setActiveTaskGroup({ id, title });
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
                        setActiveTaskGroup({ id, title });
                    }}
                />
            ) : (
                <span>{groupTitle}</span>
            )}
        </li>
    );
}
