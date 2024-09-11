import type { TicketType } from "@prisma/client";
import { db } from "@/db";
import { notFound } from "next/navigation";

// TODO: implement access control
export async function fetchTicketTypesByEvent(
    eventId: number
): Promise<TicketType[]> {
    return await db.ticketType.findMany({
        where: {
            eventId,
        },
    });
}

export async function fetchTicketTypeById(id: number): Promise<TicketType> {
    const ticketType = await db.ticketType.findUnique({
        where: {
            id,
        },
    });

    if (!ticketType) {
        notFound();
    }

    return ticketType;
}

export async function fetchTickets(ticketTypeId: number): Promise<TicketType> {
    const tickets = await db.ticketType.findFirst({
        include: {
            tickets: true,
        },
    });

    if (!tickets) {
        notFound();
    }

    return tickets;
}
