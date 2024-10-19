import Sidebar from "./components/Sidebar";

type PropsType = {
    children: React.ReactNode;
};

export default function Layout(props: PropsType) {
    return (
        <section className="flex min-h-screen overflow-y-hidden">
            <Sidebar />

            <main>{props.children}</main>
        </section>
    );
}
