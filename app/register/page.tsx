'use client'

import { useForm } from "react-hook-form"
import SelectDemo from './SelectDemo';
export default function UserRegister(){
    type FormData = {
        userName : string;
        email : string;
        passwordHash : string;
        firstName : string;
        lastName : string;
        userType : string;
    }
    
    const {register , handleSubmit , setValue , formState:{errors}} = useForm<FormData>();
    async function FetchSubmit(data:FormData){
        try{
            const response = await fetch('http://localhost:3001/Database/Queries/users',{
              method:'POST',
              headers:{
                'Content-Type': 'application/json'
              },
              body:JSON.stringify(data)
            })
            if (response.ok) {
              const result = await response.json();
              console.log('Success:', result);
            } else {
              console.error('Error:', response.statusText);
            }
        }catch(error){
          console.log(error)
        }
   } 
    console.log(errors)
      return (
         <div>
              <form onSubmit={handleSubmit(async(data)=>{
                 console.log(data)
                   await FetchSubmit(data)
               })}>
                   <input 
                        type="text"
                        {...register('userName',{required:'Enter user name'})}
                        placeholder="User Name"
                   />
                   {errors.userName && <p>{errors.userName.message}</p>}
                    <input 
                        type="text"
                        {...register('firstName',{required:'First name not be a single character'})}
                        placeholder="First Name"
                   />
                   {errors.firstName && <p>{errors.firstName.message}</p>}
                    <input 
                        type="text"
                        {...register('lastName',{required:'Last name not be a single character'})}
                        placeholder="Last Name"
                   />
                   {errors.lastName && <p>{errors.lastName.message}</p>}
                   <input 
                        type="email"
                        {...register('email',{required:'Invalid email'})}
                        placeholder="Email"
                   />
                   {errors.email && <p>{errors.email.message}</p>}
                     <input   //         pending --- should like dropdown menu
                        type="text"
                        {...register('userType',{required:'Invalid user type'})}
                        placeholder="User type"
                    /> 
                   
                    <SelectDemo
                      onValueChange={(value) => setValue('userType',value)}
                    />
                     {errors.userType && <p>{errors.userType.message}</p>}
                    <input 
                        type="password"
                        {...register('passwordHash',{required:'Invalid password',minLength:{
                            value:8,
                            message:'Password must be atleast 8 characters'
                        },maxLength:{
                            value:10,
                            message:'Password should not above 10 characters'
                        }
                       })}
                        placeholder="Password"
                   />
                    {errors.passwordHash && <p>{errors.passwordHash.message}</p>}
                   <button
                        type='submit'
                        //placeholder="Register"
                   > Register </button>
                  
              </form>   
         </div>
      )
}