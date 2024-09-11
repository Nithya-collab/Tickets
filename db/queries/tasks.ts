import type { Task } from "@prisma/client";
import { db } from "@/db";
import { notFound } from "next/navigation";

import type { User } from "lucia";

// forbidden - is there a need to list all tasks ( at database table level ) regardless of who created them
// export async function fetchTasks(): Promise<Task[]> {

//     return await db.task.findMany()
// }

export async function fetchTasksByUser(authuser: User): Promise<Task[]> {
    return await db.task.findMany({
        where: {
            user: {
                email: authuser.email,
            },
        },
    });
}
/* This function has no access control */
export async function fetchTaskById(id: number): Promise<Task> {
    const task = await db.task.findFirst({
        where: {
            id,
        },
    });

    if (!task) {
        notFound(); // how next handles 404 in the sub layout ??
    }

    return task;
}

export async function fetchTaskByUser(
    id: number,
    userId: number
): Promise<Task> {
    const task = await db.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            tasks: {
                where: {
                    id,
                },
            },
        },
    });

    if (!task?.tasks[0]) {
        notFound(); // how next handles 404 in the sub layout ??
    }

    return task.tasks[0];
}
