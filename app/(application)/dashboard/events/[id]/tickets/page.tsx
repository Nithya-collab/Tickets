import { fetchTicketTypesByEvent } from "@/db/queries/tickets";
import { getUser } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

interface EventProps {
    params: {id: number}
}

async function Home({params: {id}}: EventProps) {
    let user = await getUser(); if (!user) { redirect("/")}
    let ticketTypes = await fetchTicketTypesByEvent(Number(id));
    return ( 
        <>
        <h1>Event Tickets</h1>
        {ticketTypes?.map( (ticketType, i) => (
            <tr key={ticketType.id} className="[&_td]:md: [&_td]:p-2 [&_td]:whitespace-nowrap [&_td]:overflow-hidden [&_td]:max-w-96">
                <td className="mx-2">{i+1}</td>
                <td>{ticketType.name}</td>
                <td title={ticketType.description}>{ticketType.description.substr(0, 96)}</td>
                <td>{ticketType.price.toFixed(2)}</td>
                <td>
                    <Link href={`/dashboard/events/${id}/tickets/edit?q=${ticketType.id}`}>edit</Link>
                </td>
            </tr>
        ))}
        </>
     );
}

export default Home;