import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function PaymentsDetails(req,res){
      const Payment = [
            {bookingId:1,paymentDate: new Date(), amount : 150.00,paymentMethod:'credit card',status: 'completed'},
            {bookingId:2,paymentDate :new Date(),amount: 200.00,paymentMethod:'paypal',status: 'pending'},
           /* {bookingId:3,paymentDate: new Date(), 120.00, 'debit card', 'pending', NOW(), NOW()},
            {bookingId:4,paymentDate: new Date(), 180.00, 'bank transfer', 'canceled', NOW(), NOW()},
            {bookingId:5,paymentDate: new Date(), 220.00, 'credit card', 'completed', NOW(), NOW()};*/
      ]
      const CreatedPayments = await prisma.Payments.createMany(
          {
             data:Payment
          }
      )
      console.log(CreatedPayments)
}

PaymentsDetails().then(async()=>{
     await prisma.$disconnect();
})
.catch(async(error)=>{
     console.log("Error ",error)
     await prisma.$disconnect();
     process.exit(1)
})
