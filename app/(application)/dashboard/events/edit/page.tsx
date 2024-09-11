import { db } from "@/db";
import { getUser, lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import Submit from "@/components/UI/Forms/Submit";
import { fetchEventByUser } from "@/db/queries/events";
import dayjs from "dayjs";

interface EventProps {
    searchParams: { id: string };
}

export default async function Home<EventProps>(q: {
    params: any;
    searchParams: any;
}) {
    const user = await getUser();
    if (!user) redirect("/dashboard");
    let event = await fetchEventByUser(user, Number(q.searchParams.q));

    return (
        <>
            <div className="max-w-7xl text-center mx-auto">
                <h1 className="text-2xl md:-ml-28">Create an Event</h1>
                <form
                    className="my-8 grid gap-2 grid-cols-[1fr_2fr]"
                    action={updateEvent}
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
                        defaultValue={event.name}
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
                        defaultValue={event.description}
                    />
                    <label htmlFor="start_time">start time</label>
                    <input
                        type="datetime-local"
                        name="start_time"
                        id="start_time"
                        defaultValue={dayjs(event.start_time).format("YYYY-MM-DDTHH:mm")}
                    />
                    <label htmlFor="end_time">end time</label>
                    <input
                        className="mb-8"
                        type="datetime-local"
                        name="end_time"
                        id="end_time"
                        defaultValue={dayjs(event.end_time).format("YYYY-MM-DDTHH:mm")}
                    />
                    <button
                        type="reset"
                        className="w-32 justify-self-center border-2 p-2 hover:bg-blue-300"
                    >
                        Reset
                    </button>
                    <Submit className="w-32 border-2 p-2 hover:bg-blue-300">
                        Update Event
                    </Submit>
                    <input type="hidden" value={event.id} name="eventId" />
                </form>
            </div>
        </>
    );
}

async function updateEvent(formData: FormData): Promise<ActionResult> {
    "use server";
    const dayjs = require("dayjs");
    const user = await getUser();
    if (!user) redirect("/dashboard");

    const name = formData.get("name");
    const description = formData.get("description");
    const start_time = formData.get("start_time");
    const end_time = formData.get("end_time");

    if (typeof name !== "string" || typeof description !== "string") {
        return {
            error: "Event creatin failed: check for typos",
        };
    }

    if (
        !dayjs(start_time).isValid() ||
        !dayjs(end_time).isValid() ||
        typeof start_time !== "string" ||
        typeof end_time !== "string"
    ) {
        return {
            error: "Event creatin failed: check the event time validity",
        };
    }

    //TODO: check resource owner - filter through access control
    await db.event.update({
        where: {
            id: Number(formData.get("eventId")),
        },
        data: {
            name: name,
            description: description,
            start_time: dayjs(start_time).format(),
            end_time: dayjs(end_time).format(),
            venue_id: 2,
            organizer_id: Number(user.id),
        },
    });

    return redirect("/dashboard/events");
}

interface ActionResult {
    error: string;
}
