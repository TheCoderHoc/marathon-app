import { Drawer } from "antd";
import Sidebar from "./Sidebar";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeSidebarDrawer, openSidebarDrawer } from "@/redux/slices/ui.slice";
export default function SidebarDrawer() {
    const dispatch = useAppDispatch();

    const { isSidebarDrawerOpen } = useAppSelector((state) => state.UI);

    const handleCloseDrawer = () => {
        dispatch(closeSidebarDrawer());
    };
    return (
        <Drawer
            open={isSidebarDrawerOpen}
            onClose={handleCloseDrawer}
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
