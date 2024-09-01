import type { Event } from '@prisma/client' 
import { db } from '..';
import { notFound } from 'next/navigation'

// import type { User } from "lucia";
import type { User } from '@prisma/client' // need to switch to auth user (lucia or authjs) after implementing authentication


// forbidden - is there a need to list all events ( at database table level ) regardless of who created them
// export async function fetchEvents(): Promise<Event[]> {
    
//     return await db.event.findMany()
// }

export async function fetchEventsByUser(authuser: User): Promise<Event[]> {
    
    return await db.event.findMany({
        where: {
            user: {
                email: authuser.email
            }
        }
    })
}

export async function fetchTaskById(id: number): Promise<Event> {

    const event = await db.event.findFirst({
        where: {
            eventId: id
        }
    })

    if (!event) {
        notFound() // how next handles 404 in the sub layout ??
    }

    return event
}