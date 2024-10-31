import { IconType } from "react-icons";

export interface TaskGroupType {
    id: number;
    title: string;
    Icon?: IconType;
    isDefault: boolean;
    isDuplicated?: boolean;
    isVisible: boolean;
}
