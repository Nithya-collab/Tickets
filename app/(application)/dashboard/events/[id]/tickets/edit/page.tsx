import { db } from "@/db";
import { getUser, lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import Submit from "@/components/UI/Forms/Submit";
import { fetchTicketTypeById } from "@/db/queries/tickets";

interface EventProps {
    searchParams: { id: string };
}

export default async function Home<EventProps>(q: {
    params: any;
    searchParams: any;
}) {
    const user = await getUser();
    if (!user) redirect("/dashboard");
    let ticketType = await fetchTicketTypeById(Number(q.searchParams.q));
    let ticketsCount = await db.ticket.count({
        where: {
            ticketTypeId: ticketType.id,
        },
    });

    return (
        <>
            <div className="max-w-7xl text-center mx-auto">
                <h1 className="text-2xl md:-ml-28">Create an Event</h1>
                <form
                    className="my-8 grid gap-2 grid-cols-[1fr_2fr]"
                    action={async(formData) =>{'use server'; updateTicketType(ticketsCount, formData);}}
                >
                    <label className="p-6" htmlFor="name">
                        Title
                    </label>
                    <input
                        className="my-4 px-2 sm:w-96"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="short title or name of the event"
                        defaultValue={ticketType.name}
                    />
                    {/* <br /> */}
                    <label className="p-6 mr-10" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        cols={32}
                        rows={8}
                        className="my-4 px-2 sm:w-96"
                        name="description"
                        id="description"
                        placeholder="short description of the event"
                        defaultValue={ticketType.description}
                    />
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        name="price"
                        min={0.0}
                        type="number"
                        defaultValue={ticketType.price.toFixed(2)}
                    />
                    <label htmlFor="count">Tickets Count</label>
                    <input
                        className="mb-8 w-32"
                        id="count"
                        name="count"
                        type="number"
                        step={1}
                        min={1}
                        max={100}
                        defaultValue={ticketsCount}
                    />
                    <button
                        type="reset"
                        className="w-32 justify-self-center border-2 p-2 hover:bg-blue-300"
                    >
                        Reset
                    </button>
                    <Submit className="w-32 top-2/ border-2 p-2 hover:bg-blue-300">
                        Update Tickets
                    </Submit>
                    <input
                        type="hidden"
                        value={ticketType.id}
                        name="ticketTypeId"
                    />
                </form>
            </div>
        </>
    );
}

async function updateTicketType(ticketsCount: number, formData: FormData): Promise<ActionResult> {
    "use server";
    const user = await getUser();
    if (!user) redirect("/dashboard");

    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const count = Number(formData.get("count"));
    const id = Number(formData.get("ticketTypeId"));

    if (
        typeof name !== "string" ||
        typeof description !== "string" ||
        typeof price !== "string"
    ) {
        return {
            error: "TicketType update failed: check for typos",
        };
    }

    // let currentTicketType = await db.ticketType.findFirst({
    //     where: {
    //         id,
    //     },
    //     select: {
    //         _count: { select: { tickets: true } },
    //     },
    // });
    // let prevCount = Number(currentTicketType?._count.tickets);
    let prevCount = ticketsCount;
    let updateCount = Math.abs(count - prevCount);

    if (prevCount > count) {
        let ticketIds = await db.ticket.findMany({
            where:{
                ticketTypeId: id
            },
            select: {
                id: true
            },
            take: updateCount,
        });
        await db.ticketType.update({
            where: {
                id,
            },
            data: {
                name: name,
                description: description,
                price: price,
                tickets: {
                    deleteMany: ticketIds,
                },
            },
        });
    } else {
        let tickets: {}[] = [];
        let ticket: {} = Object.create(null); console.log(ticketsCount, `count: ${count}`);
        for (let i = 0; i < updateCount; i++) {
            tickets.push(ticket);
        }
        //TODO: check resource owner - filter through access control
        await db.ticketType.update({
            where: {
                id,
            },
            data: {
                name: name,
                description: description,
                price: price,
                tickets: {
                    createMany: {
                        data: tickets,
                    },
                },
            },
        });
    }

    return redirect("/dashboard/events/tickets");
}

interface ActionResult {
    error: string;
}
