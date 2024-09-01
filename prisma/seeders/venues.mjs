import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function venuesDetails(){
    const venue = await prisma.Venues.create({
        data:{  
            venueName:'Open Air Park',
            address: '202 Birch St', 
            city : 'Smallville',  
            state : 'KS',   
            zipCode :'11223', 
            country : 'Paris',
            capacity : 8000,
            description :'An open-air park perfect for large outdoor events.',
        }
    })
    console.log(venue)
}

venuesDetails().then(async() => {
      await prisma.$disconnect();
 }).catch(async(error)=>{
     console.log("Error in fetching data : ",error);
     await prisma.$disconnect();
     process.exit(1);
 })