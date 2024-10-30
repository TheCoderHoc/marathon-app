"use client";
import Sidebar from "@/components/ui/Sidebar";
import SidebarDrawer from "@/components/ui/SidebarDrawer";
import TaskItemViewArea from "@/components/ui/TaskItemViewArea";
import TaskListView from "@/components/ui/TaskListView";
import { useAppSelector } from "@/redux/store";

export default function Layout() {
    const { isTaskItemViewOpen } = useAppSelector((state) => state.UI);

    return (
        <>
            <section className="flex min-h-screen overflow-y-hidden">
                <Sidebar className="hidden md:flex md:h-auto" />

                <TaskListView />

                {isTaskItemViewOpen && <TaskItemViewArea />}

                <SidebarDrawer />
            </section>
        </>
    );
}
