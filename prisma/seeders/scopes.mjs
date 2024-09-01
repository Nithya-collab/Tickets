/*import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function scopesDetails(){
    const scopes = [
        { scopeName: 'Member Only', description: 'Events accessible only to members.' },
        { scopeName: 'Staff Only', description: 'Events accessible only to staff.' },
        { scopeName: 'Parent Only', description: 'Events accessible only to parents.' },
        { scopeName: 'Children Only', description: 'Events accessible only to children.' },
        { scopeName: 'Adult Only', description: 'Events accessible only to adults.' }
    ]
    const createdScopes = await prisma.scopes.createMany({
        data: scopes
    });
    console.log(createdScopes)
}
scopesDetails().then(async() => {
    await prisma.$disconnect();
}).catch(async(error)=>{
   console.log("Error in fetching data : ",error);
   await prisma.$disconnect();
   process.exit(1);
}) 

*/
   import { PrismaClient } from "@prisma/client";
   const prisma = new PrismaClient();

   async function Update(){
      const updatedScope = await prisma.Scopes.update(
         {
             where:{scopeId:30},
             data:{
                scopeId:5,
                updatedAt: new Date()
             }
         }
      )
      console.log("updated..",updatedScope)
   }

   Update().then(async()=>{
        await prisma.$disconnect();
   }).catch((error) => {
        console.log("Error updating ", error)
   })


/*import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:../Database/TicketBookingSystem.db?connection_limit=1&timeout=60000',
    },
  },
});

async function Update() {
  try {
    const updatedScope = await prisma.Scopes.update({
      where: { scopeId: 22 },
      data: {
        scopeId: 2,
        updatedAt: new Date(),
      },
    });
    console.log("updated..", updatedScope);
  } catch (error) {
    console.error("Error updating", error);
  } finally {
    await prisma.$disconnect();
  }
}

Update();
*/