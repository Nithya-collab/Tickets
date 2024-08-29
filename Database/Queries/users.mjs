// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// async function usersDetails(){
//     const user = await prisma.Users.create({
//         data:{
//             userName:'Mary',
//             email:'Mary09@gmail.com',
//             passwordHash:'Mary@7890',
//             firstName:'Mary',
//             lastName:'',
//             userType:'organizer',
//         }
//     })
//     console.log(user)
// }

// usersDetails().then(async() => {
//       await prisma.$disconnect();
//  }).catch(async(error)=>{
//      console.log("Error in fetching data : ",error);
//      await prisma.$disconnect();
//      process.exit(1);
//  })

import { PrismaClient } from "@prisma/client";
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors'
const prisma = new PrismaClient();

const app = express();
const port = 3001;

app.use(cors({
      origin: 'http://localhost:3000',
      methods:['GET','POST'],
      allowedHeaders:['Content-Type']
}))

app.use(bodyParser.json());

app.post('/Database/Queries/users', async (req,res) => {
   const {userName , email , passwordHash , firstName,lastName,userType} = req.body;
   const booking_users = await prisma.Users.create({ 
                data: {  
                    // Add `data` field here
                    userName:userName ,
                    email:email,
                    passwordHash:passwordHash,
                    firstName:firstName, 
                    lastName:lastName,
                    userType:userType, 

               }
              
   })
   console.log(booking_users);
   res.json({message:'Data Receive successfully...'});
})

   app.listen(port, () => {
     console.log(`Express server running on http://localhost:${port}`);
   });
