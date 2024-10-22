import Sidebar from "./components/Sidebar";
import TaskListView from "./components/TaskListView";

type PropsType = {
    children: React.ReactNode;
};

export default function Layout(props: PropsType) {
    return (
        <section className="flex min-h-screen overflow-y-hidden">
            <Sidebar />

            <TaskListView />
        </section>
    );
}
