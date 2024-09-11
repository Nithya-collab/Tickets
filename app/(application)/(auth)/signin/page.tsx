import { fetchUserByEmail } from "@/db/queries/users";
import { getUser, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Bcrypt } from "oslo/password";

export default async function Page() {
	const user = await getUser()
    if(user) redirect("/dashboard")
	
		return (
		<>
			<div className="max-w-7xl mx-auto my-16 text-center">
				<h1 className="text-2xl -ml-60">Sign in</h1>
				<form className="my-8" action={login}>
					<label className="p-6" htmlFor="email">Email</label>
					<input className="my-4 px-2 ml-8" type="email" name="email" id="email" />
					<br />
					<label className="p-6" htmlFor="password">Password</label>
					<input className="my-4 px-2" type="password" name="password" id="password"/>
					<br />
					<button className="border-2 mt-4 -ml-56 p-2 hover:bg-blue-300" type="submit">Continue</button>
				</form>
			</div>
		</>
	);
}

async function login(formData: FormData): Promise<ActionResult> {
	"use server";
	const email = formData.get("email"); // validate email
	const password = formData.get("password");
	if (typeof password !== "string" || typeof email !== "string" || password.length < 6 || password.length > 255) {
		return {
			error: "Invalid password"
		};
	}
	
	const user = await fetchUserByEmail(email);
    
    const bcrypt = new Bcrypt();
    
	const validPassword = await bcrypt.verify(user.password, password);

	if (!validPassword) {
		return {
			error: "Invalid email or password"
		};
	}
    // @ts-ignore: lucia register UserId:number not reflecting
	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/dashboard"); // intended redirect
}

interface ActionResult {
	error: string;
}