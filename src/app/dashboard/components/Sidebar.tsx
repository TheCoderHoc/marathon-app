"use client";

import { Avatar, Divider } from "antd";
import { MdSearch } from "react-icons/md";
import Input from "@/components/Input";
import { FiPlus } from "react-icons/fi";
import Button from "@/components/Button";
import TaskGroup from "./TaskGroup";
import useTaskGroup from "@/store/task-group-store";
import { twMerge } from "tailwind-merge";
import { AiOutlinePlus } from "react-icons/ai";
import useDrawerStore from "@/store/drawer-store";
import { HiOutlineBars3 } from "react-icons/hi2";

type PropsType = {
    className?: string;
};

export default function Sidebar(props: PropsType) {
    const { taskGroups, addTaskGroup } = useTaskGroup();

    const classNames = twMerge(
        "min-w-[280px] max-w-[280px] bg-gray-100 pb-1 flex flex-col justify-between",
        props.className
    );

    const { onClose } = useDrawerStore();

    const handleAddTaskGroup = () => {
        const newTaskGroup = {
            id: Math.floor(Math.random() * 10000),
            title: "Untitled Group",
            isDefault: false,
        };

        addTaskGroup(newTaskGroup);
    };

    return (
        <aside className={classNames} style={{ scrollbarWidth: "thin" }}>
            <section className="px-2">
                <Button
                    icon={<HiOutlineBars3 size={24} />}
                    className="bg-transparent border-none shadow-none text-black md:hidden "
                    onClick={onClose}
                />

                <div className="flex items-center gap-2 mt-2">
                    <Avatar
                        alt="Dave Wilson"
                        icon="DW"
                        className="w-[50px] h-[50px]"
                    />

                    <div>
                        <h3 className="font-bold">Dave Wilson</h3>
                        <p className="block -mt-1 text-sm">
                            ubakawilson@gmail.com
                        </p>
                    </div>
                </div>

                {/* Search Input */}
                <div className="mt-2">
                    <Input
                        placeholder="Search"
                        suffix={<MdSearch size={16} />}
                    />
                </div>

                {/* Task Lists */}
                <ul className="flex flex-col gap-2.5 mt-3">
                    {taskGroups &&
                        taskGroups.map((taskGroup, index) => (
                            <>
                                <TaskGroup
                                    key={taskGroup.id}
                                    taskGroup={taskGroup}
                                />

                                {index === 2 && <Divider className="my-0.5" />}
                            </>
                        ))}
                </ul>
            </section>

            <section>
                <Button
                    icon={<FiPlus size={20} />}
                    block
                    className="bg-transparent border-none border-0 outline-none shadow-nonebg-red-500 hover:bg-gray-200 hover:text-inherit w-full py-2 flex items-center justify-start"
                    wave={false}
                    onClick={handleAddTaskGroup}
                >
                    New Group
                </Button>
            </section>
        </aside>
    );
}
