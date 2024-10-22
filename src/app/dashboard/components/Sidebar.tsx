"use client";

import { Avatar, Divider } from "antd";
import { MdSearch } from "react-icons/md";
import Input from "@/components/Input";
import { FiPlus } from "react-icons/fi";
import Button from "@/components/Button";
import { useState } from "react";
import { TaskGroupType } from "../types";
import useActiveTaskGroupStore from "@/store/active-task-group-store";
import TaskGroup from "./TaskGroup";

export default function Sidebar() {
    const [taskGroups, setTaskGroups] = useState<TaskGroupType[]>([]);

    const { setActiveTaskGroup } = useActiveTaskGroupStore();

    const handleAddTaskGroup = () => {
        const newTaskGroup = {
            id: Math.floor(Math.random() * 10000),
            title: "Untitled Group (1)",
        };

        setTaskGroups([...taskGroups, newTaskGroup]);

        setActiveTaskGroup(newTaskGroup);
    };

    const handleEditTaskGroup = (id: number, title: string) => {
        const newTaskGroups = taskGroups.map((group) => {
            if (group.id === id) {
                return { ...group, title };
            }

            return group;
        });

        setTaskGroups(newTaskGroups);
        
    };

    return (
        <aside className="min-w-[300px] bg-gray-100 pb-1 flex flex-col justify-between">
            <section className="px-2 py-4">
                <div className="flex items-center gap-2">
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

                <Divider />

                {/* Task Lists */}
                <ul className="flex flex-col gap-2.5">
                    {taskGroups &&
                        taskGroups.map((taskGroup) => (
                            <TaskGroup
                                key={taskGroup.id}
                                taskGroup={taskGroup}
                                onEditTaskGroup={handleEditTaskGroup}
                            />
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
