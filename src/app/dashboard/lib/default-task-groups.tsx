import { FiSun } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { TaskGroupType } from "../types";

const defaultTaskGroups:TaskGroupType[] = [
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
];

export default defaultTaskGroups;
