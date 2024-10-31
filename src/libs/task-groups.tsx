import { FiSun } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { AiOutlineStar } from "react-icons/ai";
import { TaskGroupType } from "../types/task-group";
import { MenuProps } from "antd";
import { CgRename } from "react-icons/cg";
import { HiOutlineDuplicate } from "react-icons/hi";
import { IoTrashOutline } from "react-icons/io5";

export const defaultTaskGroups: TaskGroupType[] = [
    {
        id: 1,
        title: "My Day",
        Icon: FiSun,
        isDefault: true,
        isVisible: true,
    },

    {
        id: 2,
        title: "Tasks",
        Icon: GoHome,
        isDefault: true,
        isVisible: true,
    },

    {
        id: 3,
        title: "Important",
        Icon: AiOutlineStar,
        isDefault: true,
        isVisible: false,
    },
];

export const taskGroupDropdownMenuItems = (
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
