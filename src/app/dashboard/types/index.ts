import { IconType } from "react-icons";

export interface TaskGroupType {
    id: number;
    title: string;
    Icon?: IconType;
    isDefault: true;
}

export interface TaskItemType {
    id: number;
    title: string;
    completed: boolean;
    starred: boolean;
    important: boolean;
    taskGroups: number[];
}
