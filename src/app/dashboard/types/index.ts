import { IconType } from "react-icons";

export interface TaskGroupType {
    id: number;
    title: string;
    Icon?: IconType;
}

export interface TaskItemType {
    id: number;
    title: string;
    completed: boolean;
    starred: boolean;
    important: boolean;
    taskGroups: number[];
}
