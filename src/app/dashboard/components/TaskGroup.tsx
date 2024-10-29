"use client";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import useTaskGroup from "@/store/task-group-store";
import Input from "@/components/atoms/Input";
import useTask from "@/store/task-store";
import { Dropdown, MenuProps, Tag } from "antd";
import useDrawerStore from "@/store/drawer-store";

import { CgRename } from "react-icons/cg";
import { HiOutlineDuplicate } from "react-icons/hi";
import { IoTrashOutline } from "react-icons/io5";
import { TaskGroupType } from "../types/task-group";

type PropsType = {
    taskGroup: TaskGroupType;
};

const menuItems = (
    handleRenameTaskGroup: () => void,
    handleDuplicateTaskGroup: () => void,
    handleDeleteTaskGroup: () => void
): MenuProps["items"] => {
    return [
        {
            key: "1",
            label: "Rename",
            icon: <CgRename size={20} />,
            className: "w-[120px] py-3 text-gray-500",
            onClick: handleRenameTaskGroup,
        },
        {
            key: "2",
            label: "Duplicate",
            icon: <HiOutlineDuplicate size={20} />,
            className: "w-[120px] py-3 text-gray-500 border-b-[1px]",
            onClick: handleDuplicateTaskGroup,
        },
        {
            key: "3",
            label: "Delete",
            icon: <IoTrashOutline size={20} />,
            className: "w-[120px] py-3 text-red-500",
            onClick: handleDeleteTaskGroup,
        },
    ];
};

export default function TaskGroup(props: PropsType) {
    const {
        taskGroup: {
            id,
            title,
            Icon = HiMiniBars3BottomLeft,
            isDefault,
            isDuplicated,
        },
    } = props;

    const [isEditMode, setEditMode] = useState(false);

    const [groupTitle, setGroupTitle] = useState(title);

    const inputRef = useRef<HTMLInputElement>();

    const {
        activeTaskGroup,
        setActiveTaskGroup,
        editTaskGroup,
        addTaskGroup,
        deleteTaskGroup,
    } = useTaskGroup();

    const { tasks, removeTask } = useTask();

    const active = activeTaskGroup === id;

    const tasksCount = tasks.filter((task) =>
        task.taskGroups.includes(id)
    ).length;

    const { onClose } = useDrawerStore();

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

    useEffect(() => {
        if (!isDefault && isDuplicated) {
            setEditMode(false);
            return;
        }

        if (!isDefault) {
            setEditMode(true);
        }
    }, []);

    /* ------------------------------------------------------- */
    const handleRenameTaskGroup = () => {
        setEditMode(true);
    };

    const handleDuplicateTaskGroup = () => {
        const newTaskGroup: TaskGroupType = {
            id: Math.floor(Math.random() * 10000),
            title: title + " copy",
            isDefault: false,
            isDuplicated: true,
        };

        addTaskGroup(newTaskGroup);

        const currentGroupTasks = tasks.filter((task) =>
            task.taskGroups.includes(id)
        );

        currentGroupTasks.map((task) => {
            return {
                ...task,
                taskGroups: task.taskGroups.push(newTaskGroup.id),
            };
        });
    };

    const handleDeleteTaskGroup = () => {
        if (active) {
            setActiveTaskGroup(1);
        }

        const updatedTasks = tasks.filter((task) =>
            task.taskGroups.includes(id)
        );

        updatedTasks.forEach((task) => {
            removeTask(task.id);
        });

        deleteTaskGroup(id);
    };

    const BaseComponent = (
        <li
            className={`flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-gray-200 rounded-md ${
                (isEditMode || active) && "bg-gray-200"
            } `}
            onClick={() => {
                setActiveTaskGroup(id);
                if (!isEditMode) {
                    onClose();
                }
            }}
        >
            <div
                className={`rounded-md py-2 px-2 ${
                    isEditMode ? "bg-gray-200" : "bg-inherit"
                }`}
            >
                <Icon size={20} className="text-primary" />
            </div>
            {isEditMode ? (
                <Input
                    value={groupTitle}
                    onChange={(e) => setGroupTitle(e.target.value)}
                    disabled={!isEditMode}
                    className={`bg-inherit cursor-default bg-white py-2 border-0 hover:cursor-pointer ${
                        isEditMode &&
                        "border-0 border-b-[3px] border-solid border-primary"
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

            {!isEditMode && !isDefault && (
                <Tag className="rounded-full bg-gray-300 ml-auto border-none">
                    {tasksCount}
                </Tag>
            )}
        </li>
    );

    if (isDefault) {
        return BaseComponent;
    }

    return (
        <Dropdown
            trigger={["contextMenu"]}
            menu={{
                items: menuItems(
                    handleRenameTaskGroup,
                    handleDuplicateTaskGroup,
                    handleDeleteTaskGroup
                ),
            }}
            placement="bottom"
            autoAdjustOverflow
        >
            {BaseComponent}
        </Dropdown>
    );
}
