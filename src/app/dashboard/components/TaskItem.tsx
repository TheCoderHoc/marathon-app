import { BsCircle } from "react-icons/bs";
import { TaskItemType } from "../types";
import { AiOutlineStar } from "react-icons/ai";
import Button from "@/components/Button";
import useTask from "@/store/task-store";
import { IoCheckmarkCircleSharp } from "react-icons/io5";

type PropsType = {
    task: TaskItemType;
};

export default function TaskItem(props: PropsType) {
    const {
        task: { id, title, completed },
    } = props;

    const { toggleTaskCompletion } = useTask();

    const handleToggleCompletion = () => {
        toggleTaskCompletion(id);
    };

    return (
        <li className="list-none bg-gray-100 p-4 rounded-md flex items-center justify-between cursor-pointer hover:bg-gray-200">
            <div className="flex items-center gap-2">
                <Button
                    icon={
                        completed ? (
                            <IoCheckmarkCircleSharp
                                size={20}
                                className="fill-blue-500 text-white"
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
