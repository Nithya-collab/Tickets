import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function EventCategoriesDetails(req,res) {
    const eventCategories = [
        { eventId: 1, categoryId: 1 },
        { eventId: 2, categoryId: 2 }
      ];
    const eventCategorie = await prisma.EventCategories.createMany({
        data:eventCategories
    })
    console.log(eventCategorie)
}

EventCategoriesDetails().then(async()=>{
     await prisma.$disconnect();
}).catch(async(error) => {
    console.log("Error :",error)
    await prisma.$disconnect();
    process.exit(1);
})