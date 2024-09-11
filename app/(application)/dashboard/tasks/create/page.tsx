import { db } from "@/db";
import { getUser, lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import Submit from "@/components/UI/Forms/Submit";

export default async function Home() {

    return ( 
        <>
			<div className="max-w-7xl text-center mx-auto">
				<h1 className="text-2xl md:-ml-28">Create a Task</h1>
				<form className="my-8 grid gap-2 grid-cols-[1fr_2fr]" action={createTask}>
					<label className="p-6" htmlFor="name">Title</label>
					<input className="my-4 px-2 sm:w-96" type="text" name="name" id="name" placeholder="short title or name of the task"/>
					{/* <br /> */}
					<label className="p-6 mr-10" htmlFor="description">Description</label>
					<textarea cols={32} rows={8} className="my-4 px-2 sm:w-96" name="description" id="description" placeholder="short description of the task"/>
					{/* <br /> */}
					<label className="mb-8" htmlFor="priority">Priority</label>
                    <select className="w-32 h-8 mx-2" name="priority" id="priority">
                        <option value="">High</option>
                        <option value="">Normal</option>
                        <option value="">Low</option>
                    </select>
                    {/* <br /> */}
					<button type="reset" className="w-32 justify-self-center border-2 p-2 hover:bg-blue-300">
                        Reset
                    </button>
					<Submit className="w-32 border-2 p-2 hover:bg-blue-300">Update Task</Submit>
				</form>
			</div>
        </>
     );
}

async function createTask(formData: FormData): Promise<ActionResult> {
    "use server";
    const user = await getUser()
    if(!user) redirect("/dashboard")

	const name = formData.get("name"); 
	const description = formData.get("description");

    if (typeof name !== "string" || typeof description !== "string" ) {
        return {
            error: "task update failed: check for typos"
		};
	}
    
	// TODO: check if username is already used
	const task = await db.task.create({
        // id: userId,
		data: {
            name: name,
            description: description,
            user_id: Number(user.id)
        } 
	});

	return redirect("/dashboard/tasks");
}

interface ActionResult {
	error: string;
}