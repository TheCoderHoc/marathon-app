import { FiSun } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { TaskGroupType } from "../types";
import { AiOutlineStar } from "react-icons/ai";

const defaultTaskGroups: TaskGroupType[] = [
    {
        id: 1,
        title: "My Day",
        Icon: FiSun,
        isDefault: true,
    },
    {
        id: 2,
        title: "Tasks",
        Icon: GoHome,
        isDefault: true,
    },
    {
        id: 3,
        title: "Important",
        Icon: AiOutlineStar,
        isDefault: true,
    },
];

export default defaultTaskGroups;
