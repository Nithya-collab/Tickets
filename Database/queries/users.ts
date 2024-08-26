import type { User } from '@prisma/client' // Importing the User type from the Prisma client library.
import { db } from '..'
import { notFound } from 'next/navigation' // Importing the notFound function from Next.js for handling 404 errors.

export async function fetchUsers(): Promise<User[]> {  // Function to fetch all users from the database.
    
    // return await db.$queryRaw`SELECT * FROM users`
    
    return await db.user?.findMany({
        orderBy: [
            {
                updatedAt: 'desc',
            }
        ],
    })
}

export async function fetchUserById(id: number): Promise<User> { // Function to fetch a single user by its ID.
    
    // const user = await db.$queryRaw`SELECT * FROM users WHERE id = ${id}`

    const user = await db.user.findFirst({
        where: {
            userId: id
        }
    })

    if (!user) {
        notFound() // If the user is not found, a 404 error is thrown.
    }

    return user
}

export async function fetchUserByEmail(email: string): Promise<User> { // Function to fetch a single user by its ID.
    
    // const user = await db.$queryRaw`SELECT * FROM users WHERE id = ${id}`

    const user = await db.user.findFirst({
        where: {
            email
        }
    })

    if (!user) {
        notFound() // If the user is not found, a 404 error is thrown.
    }

    return user
}