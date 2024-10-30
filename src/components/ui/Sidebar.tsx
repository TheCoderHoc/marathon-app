"use client";
import { Avatar, Divider } from "antd";
import { MdSearch } from "react-icons/md";
import Input from "@/components/atoms/Input";
import { FiPlus } from "react-icons/fi";
import Button from "@/components/atoms/Button";
import TaskGroup from "./TaskGroup";
import { twMerge } from "tailwind-merge";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { addTaskGroup } from "@/redux/slices/task-group";
import { openSidebarDrawer } from "@/redux/slices/ui";

type PropsType = {
    className?: string;
};

export default function Sidebar(props: PropsType) {
    const { taskGroups } = useAppSelector((state) => state.taskGroup);

    const dispatch = useAppDispatch();

    const classNames = twMerge(
        "min-w-[280px] max-w-[280px] bg-gray-100 pb-1 flex flex-col justify-between",
        props.className
    );

    const handleAddTaskGroup = () => {
        const newTaskGroup = {
            id: Math.floor(Math.random() * 10000),
            title: "Untitled Group",
            isDefault: false,
        };

        dispatch(addTaskGroup(newTaskGroup));
    };

    return (
        <aside className={classNames} style={{ scrollbarWidth: "thin" }}>
            <section className="px-2">
                <Button
                    icon={<HiOutlineBars3 size={24} />}
                    className="bg-transparent border-none shadow-none text-black md:hidden "
                    onClick={() => dispatch(openSidebarDrawer())}
                />

                <div className="flex items-center gap-2 mt-2">
                    <Avatar
                        alt="Dave Wilson"
                        icon="DW"
                        className="w-[50px] h-[50px]"
                    />

                    <div>
                        <h3 className="font-bold">Dave Wilson</h3>
                        <span className="block -mt-1 text-sm">
                            ubakawilson@gmail.com
                        </span>
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
                            <div key={taskGroup.id}>
                                <TaskGroup taskGroup={taskGroup} />

                                {index === 2 && <Divider className="my-0.5" />}
                            </div>
                        ))}
                </ul>
            </section>

            <Button
                icon={<FiPlus size={20} />}
                block
                className="bg-transparent border-none outline-none shadow-none hover:bg-gray-200 hover:text-inherit w-full py-2 flex items-stretch justify-start"
                wave={false}
                onClick={handleAddTaskGroup}
            >
                New Group
            </Button>
        </aside>
    );
}
