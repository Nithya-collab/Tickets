import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function EventsDetails(req,res) {
    const events = [
        {
            eventName: 'Rock Concert',
            description: 'A live rock concert featuring popular bands.',
            startTime: new Date('2024-08-15T19:00:00Z'),
            endTime: new Date('2024-08-15T22:00:00Z'),
            organizerId: 6,
            venueId: 1
        },
        {
            eventName: 'Tech Conference',
            description: 'An annual conference on the latest in technology.',
            startTime: new Date('2024-09-20T09:00:00Z'),
            endTime: new Date('2024-09-20T17:00:00Z'),
            organizerId: 8,
            venueId: 2
        }]
        const event = await prisma.Events.createMany({
            data:events
        });
        console.log(event)
}

EventsDetails().then(async()=>{
     await prisma.$disconnect();
})
.catch(async(error)=>{
     console.log("Error in Fetching Data ", error);
     await prisma.$disconnect();
     process.exit(1);
})