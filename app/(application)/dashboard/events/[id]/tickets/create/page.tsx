import { db } from "@/db";
import { getUser, lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import Submit from "@/components/UI/Forms/Submit";
import { fetchTicketTypeById } from "@/db/queries/tickets";
import { object } from "zod";

interface TicketTypeProps {
    params: {id: number}
}

export default async function Home({params: {id}}: TicketTypeProps) {
    const user = await getUser();
    if (!user || !id) redirect("/dashboard");

    return (
        <>
            <div className="max-w-7xl text-center mx-auto">
                <h1 className="text-2xl md:-ml-28">Ticket Type</h1>
                <form
                    className="my-8 grid gap-2 grid-cols-[1fr_2fr]"
                    action={createTicketType}
                >
                    <label className="p-6" htmlFor="name">
                        Title
                    </label>
                    <input
                        className="my-4 px-2 sm:w-96"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="VIP or Early BIrd or General or ..."
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
                        placeholder="short description of the benefits of this ticket type"
                    />
                    <label htmlFor="price">Price</label>
                    <input className="mb-8" id="price" name="price" min={0.00} type="number" />
                    <label htmlFor="count">Tickets Count</label>
                    <input className="mb-8 w-32" id="count" name="count" type="number" step={1} min={1} max={100} />
                    <button
                        type="reset"
                        className="w-32 justify-self-center border-2 p-2 hover:bg-blue-300"
                    >
                        Reset
                    </button>
                    <Submit className="w-32 border-2 p-2 hover:bg-blue-300">
                        Create Tickets
                    </Submit>
                    <input type="hidden" value={id} name="eventId" />
                </form>
            </div>
        </>
    );
}

async function createTicketType(formData: FormData): Promise<ActionResult> {
    "use server";
    const user = await getUser();
    if (!user) redirect("/dashboard");

    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const eventId = formData.get("eventId");
    const count = formData.get('count');

    if (typeof name !== "string" || typeof description !== "string" || typeof price !== "string") {
        return {
            error: "TicketType creation failed: check for typos",
        };
    }

    let tickets:{}[] = [];
    let ticket: {} = Object.create(null);
    for (let i = 0; i < Number(count); i++) {
        tickets.push(ticket);   
    }

    //TODO: check resource owner - filter through access control
    await db.ticketType.create({
        data: {
            name,
            description,
            price,
            eventId: Number(eventId),
            tickets: {
                createMany: {
                    data: tickets
                }
            }
        },
    });

    return redirect("/dashboard/events/tickets");
}

interface ActionResult {
    error: string;
}
