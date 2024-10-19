import { Avatar } from "antd";

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
        </aside>
    );
}
