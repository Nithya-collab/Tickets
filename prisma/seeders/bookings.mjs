import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function BookingsDetails(req,res){
      const Bookings = [
        {userId:1,eventId:1, bookingDate:new Date(), totalAmount:150.00, status:'confirmed'},
        {userId:7,eventId:1, bookingDate:new Date(), totalAmount:200.00, status:'confirmed'},
        /*{userId:3,eventId:2, bookingDate:NOW(), totalAmount:120.00, status:'pending'},
        {userId:4,eventId:3, bookingDate:NOW(), totalAmount:180.00, status:'canceled'},
        {userId:5,eventId:2, bookingDate:NOW(), totalAmount:220.00, status:'confirmed'}*/
      ]
      const CreatedBookings = await prisma.Bookings.createMany(
          {
             data:Bookings
          }
      )
      console.log(CreatedBookings)
}

BookingsDetails().then(async()=>{
     await prisma.$disconnect();
})
.catch(async(error)=>{
     console.log("Error ",error)
     await prisma.$disconnect();
     process.exit(1)
})
