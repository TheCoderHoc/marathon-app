"use client";
import Sidebar from "./components/Sidebar";
import TaskListView from "./components/TaskListView";
import SidebarDrawer from "./components/SidebarDrawer";

type PropsType = {
    children: React.ReactNode;
};

export default function Layout(props: PropsType) {
    return (
        <>
            <section className="flex min-h-screen overflow-y-hidden">
                <Sidebar className="hidden md:flex md:h-auto" />

                <TaskListView />

                <SidebarDrawer />
            </section>
        </>
    );
}
