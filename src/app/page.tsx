import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1>
                <Link href="/dashboard">Welcome to Marathon</Link>
            </h1>
        </div>
    );
}
