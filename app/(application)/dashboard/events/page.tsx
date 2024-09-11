import { fetchEventsByUser } from "@/db/queries/events";
import { getUser } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Home() {
    let user = await getUser(); if (!user) { redirect("/")}
    let events = await fetchEventsByUser(user);
    return ( 
        <>
        <h1>Hello Events</h1>
        {events?.map( (event, i) => (
            <tr key={event.id} className="[&_td]:md: [&_td]:p-2 [&_td]:whitespace-nowrap [&_td]:overflow-hidden [&_td]:max-w-96">
                <td className="mx-2">{i+1}</td>
                <td>{event.name}</td>
                <td title={event.description}>{event.description.substr(0, 96)}</td>
                <td>
                    <Link href={`/dashboard/events/edit?q=${event.id}`}>edit</Link>
                </td>
            </tr>
        ))}
        </>
     );
}

export default Home;