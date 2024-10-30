import { Input as AntdInput } from "antd";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { AiOutlineStar } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import TaskStepItem from "./TaskStepItem";
import { FiSun } from "react-icons/fi";
import { TfiAlarmClock } from "react-icons/tfi";
import { MdOutlineEventRepeat } from "react-icons/md";
import { LiaCalendarWeekSolid } from "react-icons/lia";
import { LiaUserPlusSolid } from "react-icons/lia";
import { GrAttachment } from "react-icons/gr";
import { LuCircle } from "react-icons/lu";
import { HiOutlineTrash } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeTaskItemView } from "@/redux/slices/ui";

export default function TaskItemViewArea() {
    const { selectedTaskToView } = useAppSelector((state) => state.UI);

    const dispatch = useAppDispatch();

    if (selectedTaskToView) {
        const { title, steps } = selectedTaskToView;

        return (
            <aside className="min-w-[400px] w-[400px] bg-gray-50 px-2 h-screen overflow-y-scroll pb-4">
                <Button
                    size="large"
                    icon={<FaTimes size={20} />}
                    className="bg-transparent border-none shadow-none text-gray-500 float-end hover:bg-gray-200"
                    wave={false}
                    onClick={() => dispatch(closeTaskItemView())}
                />

                <div className="clear-end bg-white rounded-md px-2 py-4 border-solid border-gray-300 border-[1px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <LuCircle size={20} />
                            <Input
                                className="font-semibold font-sans border-none shadow-none text-md p-0"
                                value={title}
                            />
                        </div>

                        <Button
                            icon={<AiOutlineStar size={20} />}
                            className=""
                        />
                    </div>

                    <ul className="flex flex-col gap-2">
                        {steps.length > 0 && (
                            <>
                                <TaskStepItem />
                                <TaskStepItem />
                                <TaskStepItem />
                            </>
                        )}

                        <TaskStepItem new />
                    </ul>
                </div>

                <Button
                    block
                    className="card hover:bg-gray-100 mt-4 flex items-center gap-2 justify-start"
                >
                    <FiSun size={20} className="ml-1 text-gray-500" />
                    <span className="text-gray-500 text-sm">Add to My Day</span>
                </Button>

                <div className="card mt-4 flex flex-col gap-4">
                    <div className="border-solid border-gray-200 border-b-[1px] flex items-center py-1.5 gap-2">
                        <TfiAlarmClock
                            size={20}
                            className="text-gray-500 ml-1"
                        />
                        <Button
                            block
                            className="bg-transparent border-none shadow-none text-gray-500 flex items-center justify-start text-sm p-0"
                            wave={false}
                        >
                            Remind me
                        </Button>
                    </div>

                    <div className="border-solid border-gray-200 border-b-[1px] flex items-center py-1.5 gap-2">
                        <LiaCalendarWeekSolid
                            size={20}
                            className="text-gray-500 ml-1"
                        />
                        <Button
                            block
                            className="bg-transparent border-none shadow-none text-gray-500 flex items-center justify-start text-sm p-0"
                            wave={false}
                        >
                            Add due date
                        </Button>
                    </div>

                    <div className="flex items-center py-1.5 gap-2">
                        <MdOutlineEventRepeat
                            size={20}
                            className="text-gray-500 ml-1"
                        />
                        <Button
                            block
                            className="bg-transparent border-none shadow-none text-gray-500 flex items-center justify-start text-sm p-0"
                            wave={false}
                        >
                            Repeat
                        </Button>
                    </div>
                </div>

                <Button
                    block
                    className="card hover:bg-gray-100 mt-4 flex items-center gap-2 justify-start"
                >
                    <LiaUserPlusSolid
                        size={20}
                        className="ml-1 text-gray-500"
                    />
                    <span className="text-gray-500 text-sm">Assign to</span>
                </Button>

                <Button
                    block
                    className="card hover:bg-gray-100 mt-4 flex items-center gap-2 justify-start"
                >
                    <GrAttachment size={20} className="ml-1 text-gray-500" />
                    <span className="text-gray-500 text-sm">Add file</span>
                </Button>

                <AntdInput.TextArea
                    placeholder="Add note"
                    className="mt-4 p-4 font-sans"
                />

                <div className="pt-2 border-solid border-gray-300 border-t-[1px] mt-4 flex items-center justify-between">
                    <span></span>
                    <span className="text-sm text-gray-500 align-center">
                        Created yesterday
                    </span>
                    <Button
                        icon={
                            <HiOutlineTrash
                                size={18}
                                className="text-gray-500"
                            />
                        }
                        className="bg-transparent border-none shadow-none hover:bg-gray-200"
                    />
                </div>
            </aside>
        );
    }
}
