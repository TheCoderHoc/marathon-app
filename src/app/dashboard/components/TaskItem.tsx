import { BsCircle } from "react-icons/bs";
import { TaskItemType } from "../types";
import { AiOutlineStar } from "react-icons/ai";
import Button from "@/components/Button";

type PropsType = {
    task: TaskItemType;
};

export default function TaskItem(props: PropsType) {
    const {
        task: { title },
    } = props;
    return (
        <li className="list-none bg-gray-100 p-4 rounded-md flex items-center justify-between cursor-pointer hover:bg-gray-200">
            <div className="flex items-center gap-2">
                <Button
                    icon={<BsCircle size={20} />}
                    className="bg-transparent border-none shadow-none"
                    wave={false}
                />
                <span>{title}</span>
            </div>
            <Button
                icon={<AiOutlineStar size={20} />}
                className="bg-transparent border-none shadow-none"
                wave={false}
            />
        </li>
    );
}
