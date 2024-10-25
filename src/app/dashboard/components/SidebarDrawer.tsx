import { Drawer } from "antd";
import Sidebar from "./Sidebar";
import useDrawerStore from "@/store/drawer-store";
export default function SidebarDrawer() {
    const { isOpen, onClose } = useDrawerStore();

    return (
        <Drawer
            open={isOpen}
            onClose={onClose}
            placement="left"
            destroyOnClose
            width={280}
            closeIcon={false}
            className="bg-gray-100"
        >
            <Sidebar className="h-full" />
        </Drawer>
    );
}
