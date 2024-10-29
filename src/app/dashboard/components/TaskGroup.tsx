"use client";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import Input from "@/components/atoms/Input";
import { Dropdown, MenuProps, Tag } from "antd";
import { CgRename } from "react-icons/cg";
import { HiOutlineDuplicate } from "react-icons/hi";
import { IoTrashOutline } from "react-icons/io5";
import { TaskGroupType } from "../types/task-group";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { removeTask } from "@/redux/slices/tasks.slice";
import {
    addTaskGroup,
    editTaskGroup,
    removeTaskGroup,
    setActiveTaskGroupId,
} from "@/redux/slices/task-group.slice";
import { closeSidebarDrawer } from "@/redux/slices/ui.slice";

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

    const dispatch = useAppDispatch();

    const [isEditMode, setEditMode] = useState(false);

    const [groupTitle, setGroupTitle] = useState(title);

    const inputRef = useRef<HTMLInputElement>(null);

    const { activeTaskGroupId } = useAppSelector((state) => state.taskGroup);

    const { tasks } = useAppSelector((state) => state.task);

    const isActive = activeTaskGroupId === id;

    const tasksCount = tasks.filter((task) =>
        task.taskGroups.includes(id)
    ).length;

    const handleInputBlur = () => {
        setEditMode(false);

        dispatch(editTaskGroup({ ...props.taskGroup, title: groupTitle }));
    };

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            setEditMode(false);

            dispatch(editTaskGroup({ ...props.taskGroup, title: groupTitle }));
        }
    };

    useEffect(() => {
        if (!isDefault && isDuplicated) {
            setEditMode(false);
            return;
        }

        if (!isDefault) {
            setEditMode(true);
        }
    }, []);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditMode]);

    const handleDuplicateTaskGroup = () => {
        const newTaskGroup: TaskGroupType = {
            id: Math.floor(Math.random() * 10000),
            title: title + " copy",
            isDefault: false,
            isDuplicated: true,
        };

        dispatch(addTaskGroup(newTaskGroup));

        const currentGroupTasks = tasks.filter((task) =>
            task.taskGroups.includes(id)
        );

        console.log(currentGroupTasks);

        // const duplicatedTasks = currentGroupTasks.map((task) => {
        //     return {
        //         ...task,
        //         taskGroups: task.taskGroups.map((group, index) => {
        //             if (index === 2) {
        //                 group = newTaskGroup.id;
        //                 return group;
        //             }

        //             return group;
        //         }),
        //     };
        // });

        // dispatch(duplicateTasks(duplicatedTasks));
    };

    const handleDeleteTaskGroup = () => {
        if (isActive) {
            dispatch(setActiveTaskGroupId(1));
        }

        const updatedTasks = tasks.filter((task) =>
            task.taskGroups.includes(id)
        );

        updatedTasks.forEach((task) => {
            dispatch(removeTask(task.id));
        });

        dispatch(removeTaskGroup(id));
    };

    const BaseComponent = (
        <li
            className={`flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-gray-200 rounded-md ${
                (isEditMode || isActive) && "bg-gray-200"
            } `}
            onClick={() => {
                dispatch(setActiveTaskGroupId(id));
                if (!isEditMode) {
                    dispatch(closeSidebarDrawer());
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
                        dispatch(setActiveTaskGroupId(id));
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

    if (isDefault || isEditMode) {
        return BaseComponent;
    }


    return (
        <Dropdown
            trigger={["contextMenu"]}
            menu={{
                items: menuItems(
                    () => {
                        setEditMode(true);
                    },
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
