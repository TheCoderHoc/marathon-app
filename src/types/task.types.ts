export interface TaskItemType {
    id: number;
    title: string;
    completed: boolean;
    taskGroups: number[];
    steps: Partial<TaskItemType>[];
}
