import { db } from "@/db";
import { getUser, lucia } from "@/lib/auth";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Bcrypt } from "oslo/password";
import { z } from "zod";

export default async function Page() {

	const user = await getUser()
    if(user) redirect("/dashboard")

	return (
		<>
			<div className="max-w-7xl text-center my-16 mx-auto">
				<h1 className="text-2xl -ml-28">Create an account</h1>
				<form className="mt-4" action={signup}>
					<label className="p-6" htmlFor="name">Your Name</label>
					<input className="my-4 px-2" type="text" name="name" id="name" />
					<br />
					<label className="p-6 mr-10" htmlFor="email">Email</label>
					<input className="my-4 px-2" type="email" name="email" id="email" />
					<br />
					<label className="p-6 mr-2" htmlFor="password">Password</label>
					<input className="my-4 px-2" type="password" name="password" id="password" />
					<br />
					<button className="border-2 ml-[-200px] p-2 hover:bg-blue-300">Create Account</button>
				</form>
			</div>
		</>
	);
}

async function signup(formData: FormData): Promise<ActionResult> {
    "use server";
	const name = formData.get("name"); 
	const email = formData.get("email"); // validate email
	
	const password = formData.get("password");
	if (typeof password !== "string" || typeof name !== "string" || typeof email !== "string" || password.length < 6 || password.length > 255) {
        return {
            error: "Invalid password"
		};
	}
    
    const bcrypt = new Bcrypt();
    
	const passwordHash = await bcrypt.hash(password);
	const userId = generateIdFromEntropySize(10); // 16 characters long
    
	// TODO: check if username is already used
	const user = await db.user.create({
        // id: userId,
		data: {
            name: name,
            email: email,
            password: passwordHash
        } 
	});
    // @ts-ignore: lucia register UserId:number not reflecting
	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}

interface ActionResult {
	error: string;
}