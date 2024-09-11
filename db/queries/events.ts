import type { Event } from "@prisma/client";
import { db } from "@/db";
import { notFound } from "next/navigation";

import type { User } from "lucia";

export async function fetchEventsByUser(authuser: User): Promise<Event[]> {
    return await db.event.findMany({
        where: {
            user: {
                email: authuser.email,
            },
        },
    });
}

export async function fetchAllEvents(): Promise<Event[]> {
    return await db.event.findMany();
}
export async function fetchEventById(id: number): Promise<Event> {
    const event = await db.event.findFirst({
        where: {
            id,
        },
    });

    if (!event) {
        notFound();
    }

    return event;
}

export async function fetchEventByUser(
    authuser: User,
    id: number
): Promise<Event> {
    const event = await db.event.findUnique({
        where: {
            id,
            user: {
                email: authuser.email,
            },
        },
    });

    if (!event) {
        notFound();
    }

    return event;
}
