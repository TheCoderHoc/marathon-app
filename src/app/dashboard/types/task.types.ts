export interface TaskItemType {
    id: number;
    title: string;
    completed: boolean;
    starred: boolean;
    important: boolean;
    taskGroups: number[];
}