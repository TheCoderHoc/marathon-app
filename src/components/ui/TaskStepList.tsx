import { TaskItemType } from "@/types/task.types";
import TaskStepItem from "./TaskStepItem";

type PropsType = {
    activeTask: TaskItemType;
};

export default function TaskStepList(props: PropsType) {
    const { activeTask } = props;

    return (
        <ul>
            {activeTask.steps.map((step) => (
                <TaskStepItem key={step.id} step={step} />
            ))}
            <TaskStepItem new />
        </ul>
    );
}
