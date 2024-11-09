export interface TaskItemType {
    id: number;
    title: string;
    completed: boolean;
    taskGroups: number[];
    steps: TaskStepType[];
}

export interface TaskStepType {
    id: number;
    title: string;
    completed: boolean;
}
