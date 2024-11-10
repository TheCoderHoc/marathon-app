import Input from "@/components/atoms/Input";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { KeyboardEvent, MouseEvent, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "@/components/atoms/Button";
import { LuCircle } from "react-icons/lu";
import { TaskStepType } from "@/types/task.types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addStep, editTaskStep } from "@/redux/slices/tasks";
import { Dropdown, InputRef } from "antd";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import {
    taskStepDropdownMenuItems,
    TaskStepDropdownParamsType,
} from "@/libs/task-groups";

type PropsType = {
    new?: boolean;
    step?: TaskStepType;
};

export default function TaskStepItem(props: PropsType) {
    const [inputFocused, setInputFocused] = useState(false);
    const [stepTitle, setStepTitle] = useState(
        props.new ? "" : props.step?.title
    );

    const inputRef = useRef<InputRef>(null);

    const dispatch = useAppDispatch();

    const { activeTaskId } = useAppSelector((state) => state.task);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            handleStepItem();
        }
    };

    const handleStepItem = () => {
        if (props.new) {
            const step: TaskStepType = {
                id: Math.floor(Math.random() * 10000),
                title: stepTitle as string,
                completed: false,
            };

            if (activeTaskId) {
                dispatch(addStep({ taskId: activeTaskId, step }));
            }

            setStepTitle("");
        }

        if (!props.new && props.step) {
            dispatch(
                editTaskStep({ ...props.step, title: stepTitle as string })
            );
            inputRef.current?.blur();
        }
    };

    const handleClick = () => {
        if (!props.new && inputRef.current) {
            inputRef.current.select();
        }
    };

    const handleFocus = () => {
        if (props.new) {
            setInputFocused(true);
        }
    };

    const handleBlur = () => {
        setInputFocused(false);

        if (!props.new) {
            handleStepItem();
        }
    };

    const handleToggleCompletion = (e: MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        toggleCompletion();
    };

    const toggleCompletion = () => {
        if (props.step) {
            const updatedTaskStep = {
                ...props.step,
                completed: !props.step?.completed,
            };

            dispatch(editTaskStep(updatedTaskStep));
        }
    };

    const dropdownParams: TaskStepDropdownParamsType = {
        toggleCompletion: toggleCompletion,
        completed: props.step?.completed as boolean,
    };

    return (
        <li
            className={`list-none py-1 flex items-center justify-between rounded-none ${
                !props.new
                    ? "border-solid border-b border-gray-100 hover:bg-gray-100 cursor-default"
                    : "hover:bg-gray-50"
            }`}
            onClick={handleClick}
        >
            <div className="flex items-center gap-4">
                {inputFocused && props.new ? (
                    <Button
                        icon={<AiOutlinePlus size={20} />}
                        className="text-primary bg-transparent border-none shadow-none outline-none border-transparent p-0 -ml-0.5"
                        wave={false}
                    />
                ) : props.step?.completed ? (
                    <Button
                        icon={
                            <IoCheckmarkCircleSharp
                                size={20}
                                className="text-gray-500"
                            />
                        }
                        className="bg-transparent border-none shadow-none outline-none border-transparent p-0 -ml-0.5"
                        wave={false}
                        onClick={handleToggleCompletion}
                    />
                ) : (
                    <Button
                        icon={<LuCircle size={20} className="" />}
                        className="bg-transparent border-none shadow-none outline-none border-transparent p-0 -ml-0.5"
                        wave={false}
                        onClick={handleToggleCompletion}
                    />
                )}

                <Input
                    placeholder="Add step"
                    className={`bg-transparent font-normal border-none shadow-none text-sm placeholder:text-primary placeholder:font-normal text-gray-500 p-0 font-sans rounded-none  ${
                        props.new ? "text-primary" : "cursor-default"
                    }`}
                    value={stepTitle}
                    onChange={(e) => setStepTitle(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                />
            </div>

            {!props.new && (
                <Dropdown
                    trigger={["click"]}
                    menu={{
                        items: taskStepDropdownMenuItems(dropdownParams),
                    }}
                    placement="bottomRight"
                >
                    <Button
                        icon={
                            <BiDotsVerticalRounded
                                size={20}
                                className="text-gray-500"
                            />
                        }
                        className="bg-transparent border-none shadow-none"
                        wave={false}
                    />
                </Dropdown>
            )}
        </li>
    );
}
