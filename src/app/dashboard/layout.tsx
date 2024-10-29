"use client";
import Sidebar from "./components/Sidebar";
import TaskListView from "./components/TaskListView";
import SidebarDrawer from "./components/SidebarDrawer";
import TaskItemViewArea from "./components/TaskItemViewArea";
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
