import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function categoriesDetails(){
    const categories = [
        {categoryName:'Concert', description : 'Music and live performances'},
        {categoryName: 'Conference', description :'Business and educational events'},
        {categoryName: 'Workshop', description : 'Hands-on training and activities'},
        {categoryName: 'Festival', description : 'Large gatherings and celebrations'},
        {categoryName: 'Sports', description : 'Athletic events and competitions'}
    ]
    const createdCategory = await prisma.categories.createMany({
        data: categories
    });
    console.log(createdCategory)
}
categoriesDetails().then(async() => {
    await prisma.$disconnect();
}).catch(async(error)=>{
   console.log("Error in fetching data : ",error);
   await prisma.$disconnect();
   process.exit(1);
})
