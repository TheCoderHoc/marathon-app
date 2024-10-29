import { BsCircle } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import Button from "@/components/atoms/Button";
import useTask from "@/store/task-store";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { TaskItemType } from "../types/task.types";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeTaskItemView, openTaskItemView } from "@/redux/slices/ui.slice";

type PropsType = {
    task: TaskItemType;
};

export default function TaskItem(props: PropsType) {
    const {
        task: { id, title, completed },
    } = props;

    const { toggleTaskCompletion } = useTask();

    const { isTaskItemViewOpen, selectedTaskToView } = useAppSelector(
        (state) => state.UI
    );
    const dispatch = useAppDispatch();

    const handleToggleCompletion = () => {
        toggleTaskCompletion(id);
    };

    const handleClick = () => {
        // If the selected task is clicked and view is already open?
        // Close the view
        // If the selected

        if (selectedTaskToView?.id === id && isTaskItemViewOpen) {
            dispatch(closeTaskItemView());
            return;
        }

        // if (isTaskItemViewOpen) {
        //     dispatch(closeTaskItemView());
        //     return;
        // }

        dispatch(openTaskItemView(props.task));
    };

    return (
        <li
            className="list-none bg-gray-100 p-4 rounded-md flex items-center justify-between cursor-pointer hover:bg-gray-200"
            onClick={handleClick}
        >
            <div className="flex items-center gap-2">
                <Button
                    icon={
                        completed ? (
                            <IoCheckmarkCircleSharp
                                size={20}
                                className="fill-primary text-white"
                            />
                        ) : (
                            <BsCircle size={20} />
                        )
                    }
                    className="bg-transparent border-none shadow-none"
                    wave={false}
                    onClick={handleToggleCompletion}
                />
                <span className={`${completed && "line-through"}`}>
                    {title}
                </span>
            </div>
            <Button
                icon={<AiOutlineStar size={20} />}
                className="bg-transparent border-none shadow-none"
                wave={false}
            />
        </li>
    );
}
