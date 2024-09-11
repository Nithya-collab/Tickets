import { db } from "@/db";
import { getUser, lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { fetchTaskByUser } from "@/db/queries/tasks";
import { z } from "zod";
import Input from "@/components/UI/Forms/Input";
import Submit from "@/components/UI/Forms/Submit";

interface TaskProps {
  searchParams: { id: string };
}

export default async function Home<TaskProps>(q: {
  params: any;
  searchParams: any;
}) {
  const user = await getUser();
  if (!user) redirect("/dashboard");
  let task = await fetchTaskByUser(Number(q.searchParams.q), Number(user.id));
  return (
    <>
      <div className="max-w-7xl text-center mx-auto">
        <h1 className="text-2xl col-span-2 sm:-ml-28">Update your Task</h1>
        <form className="my-8 grid grid-cols-[1fr_2fr]" action={updateTask}>
          <label className="p-6" htmlFor="name">
            Title
          </label>
          <Input
            className="my-4 px-2 sm:w-96"
            type="text"
            name="name"
            id="name"
            defaultValue={task.name}
          />
          {/* <br /> */}
          <label className="p-6 mr-10" htmlFor="description">
            Description
          </label>
          <textarea
            cols={32}
            rows={8}
            className="my-4 px-2 sm:w-96"
            name="description"
            id="description"
            defaultValue={task.description}
          />
          {/* <br /> */}
          <label className="mb-8" htmlFor="priority">
            Priority
          </label>
          <select className="w-32 h-8 mx-2" name="priority" id="priority">
            <option value="">High</option>
            <option value="">Normal</option>
            <option value="">Low</option>
          </select>
          {/* <br /> */}
          <button
            type="reset"
            className="w-32 justify-self-center border-2 p-2 hover:bg-blue-300"
          >
            Cancel Edit
          </button>
          <Submit className="w-32 border-2 p-2 hover:bg-blue-300">
            Update Task
          </Submit>
          <input type="hidden" value={task.id} name="taskId" />
        </form>
      </div>
    </>
  );
}

async function updateTask(formData: FormData): Promise<ActionResult> {
  "use server";
  const user = await getUser();
  if (!user) redirect("/dashboard");

  const name = formData.get("name");
  const description = formData.get("description");

  if (typeof name !== "string" || typeof description !== "string") {
    return {
      error: "task update failed: check for typos",
    };
  }

  // TODO: check if username is already used
  const task = await db.task.update({
    where: {
      id: Number(formData.get("taskId")),
      // user_id: Number(user.id)
    },
    data: {
      user: {
        connect: {
          id: Number(user.id),
        },
      },
      name: name,
      description: description,
    },
  });

  return redirect("/dashboard/tasks");
}

interface ActionResult {
  error: string;
}
