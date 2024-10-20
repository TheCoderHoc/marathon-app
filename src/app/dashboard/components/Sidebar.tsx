import { Avatar } from "antd";
import { MdSearch } from "react-icons/md";
import Input from "@/components/Input";
import { FiPlus } from "react-icons/fi";
import Button from "@/components/Button";

export default function Sidebar() {
    return (
        <aside className="min-w-[250px] bg-gray-100 pb-1 flex flex-col justify-between">
            <section className="px-2 py-4">
                <div className="flex items-center gap-2">
                    <Avatar
                        alt="Dave Wilson"
                        icon="DW"
                        className="w-[50px] h-[50px]"
                    />

                    <div>
                        <h3 className="font-bold">Dave Wilson</h3>
                        <p className="block -mt-1 text-sm">
                            ubakawilson@gmail.com
                        </p>
                    </div>
                </div>

                {/* Search Input */}
                <div className="mt-2">
                    <Input
                        placeholder="Search"
                        suffix={<MdSearch size={16} />}
                    />
                </div>
            </section>

            <section>
                <Button
                    icon={<FiPlus size={20} />}
                    block
                    className="bg-transparent border-none border-0 outline-none shadow-nonebg-red-500 hover:bg-gray-200 hover:text-inherit w-full py-2 flex items-center justify-start"
                    wave={false}
                >
                    New list
                </Button>
            </section>
        </aside>
    );
}
