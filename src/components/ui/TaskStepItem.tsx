import Input from "@/components/atoms/Input";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "@/components/atoms/Button";
import { LuCircle } from "react-icons/lu";

type PropsType = {
    new?: boolean;
};

export default function TaskStepItem(props: PropsType) {
    const [inputFocused, setInputFocused] = useState(false);

    return (
        <li className="list-none rounded-md py-0.5 flex items-center justify-between">
            <div className="flex items-center gap-4">
                {inputFocused && props.new ? (
                    <AiOutlinePlus size={16} className="text-primary ml-0.5" />
                ) : (
                    <LuCircle size={15} className="ml-0.5" />
                )}

                <Input
                    placeholder="Add Next Step"
                    className={`bg-transparent font-normal border-none shadow-none text-sm placeholder:text-primary placeholder:font-normal text-gray-500 p-0 font-sans ${
                        props.new && "text-primary"
                    }`}
                    value={`${props.new ? "" : "Hello World"}`}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                />
            </div>

            <Button
                icon={
                    <BiDotsVerticalRounded
                        size={20}
                        className="text-gray-500"
                    />
                }
                className="bg-transparent border-none shadow-none"
                wave={false}
            />
        </li>
    );
}
