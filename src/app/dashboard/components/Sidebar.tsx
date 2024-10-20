import { Avatar } from "antd";
import { MdSearch } from "react-icons/md";
import Input from "@/components/Input";

export default function Sidebar() {
    return (
        <aside className="min-w-[250px] bg-gray-100 px-2 py-4">
            <div className="flex items-center gap-2">
                <Avatar
                    alt="Dave Wilson"
                    icon="DW"
                    className="w-[50px] h-[50px]"
                />

                <div>
                    <h3 className="font-bold">Dave Wilson</h3>
                    <p className="block -mt-1 text-sm">ubakawilson@gmail.com</p>
                </div>
            </div>

            {/* Search Input */}
            <div className="mt-2">
                <Input
                    placeholder="Search"
                    suffix={<MdSearch size={16} />}
                    className="focus:border-none focus:outline-none focus:border-0 focus"
                />
            </div>
        </aside>
    );
}

// commit -> created a custom input and search input on sidebar
