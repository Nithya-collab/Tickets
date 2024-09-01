import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function usersDetails(){
    const user = await prisma.Users.create({
        data:{
            userName:'Mary',
            email:'Mary09@gmail.com',
            passwordHash:'Mary@7890',
            firstName:'Mary',
            lastName:'',
            userType:'organizer',
        }
    })
    console.log(user)
}

usersDetails().then(async() => {
      await prisma.$disconnect();
 }).catch(async(error)=>{
     console.log("Error in fetching data : ",error);
     await prisma.$disconnect();
     process.exit(1);
 })