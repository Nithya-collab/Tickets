import { fetchTasksByUser } from "@/db/queries/tasks";
import { getUser } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Home() {
    let user = await getUser(); if (!user) { redirect("/")}
    let tasks = await fetchTasksByUser(user);
    return ( 
        <>
        <h1>Hello Tasks</h1>
        {tasks?.map( (task, i) => (
            <tr key={task.id} className="[&_td]:md: [&_td]:p-2 [&_td]:whitespace-nowrap [&_td]:overflow-hidden [&_td]:max-w-96">
                <td className="mx-2">{i+1}</td>
                <td>{task.name}</td>
                <td>{ Math.random() > 0.5 ? <span className="badge bg-red-400">High</span> : <span className="py-1 px-2 rounded-xl bg-blue-300">Normal</span> }</td>
                <td title={task.description}>{task.description.substr(0, 96)}</td>
                <td>
                    <Link href={`/dashboard/tasks/edit?q=${task.id}`}>edit</Link>
                </td>
            </tr>
        ))}
        </>
     );
}

export default Home;