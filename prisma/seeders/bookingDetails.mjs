import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function TicketsBookingsDetails(req,res){
      const TicketsBookings = [
        {bookingId:1,ticketId:1, quantity:1, price:150.00},
        {bookingId:1,ticketId:2, quantity:1, price:200.00},
      ]
      const CreatedBookingsDetails = await prisma.BookingDetails.createMany(
          {
             data:TicketsBookings
          }
      )
      console.log(CreatedBookingsDetails)
}

TicketsBookingsDetails().then(async()=>{
     await prisma.$disconnect();
})
.catch(async(error)=>{
     console.log("Error ",error)
     await prisma.$disconnect();
     process.exit(1)
})
