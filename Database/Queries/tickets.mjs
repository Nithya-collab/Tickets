import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function ticketsDetails(){
    const ticket = await prisma.Tickets.create({
        data:{  
                eventId : 2, 
                userId :7,
                categoryId : 1,
                scopeId :1,
                status : 'pending',
                price : 200.0

        }
    })
    console.log(ticket)
}

ticketsDetails().then(async() => {
      await prisma.$disconnect();
 }).catch(async(error)=>{
     console.log("Error in fetching data : ",error);
     await prisma.$disconnect();
     process.exit(1);
 })