import { cache } from "react";
import { db } from "@/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Lucia } from "lucia";
import type { Session, User } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

const adapter = new PrismaAdapter(db.session, db.user)

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: process.env.NODE_ENV === "production"
        }
    },
    getUserAttributes: attributes => {
        return {
            name: attributes.name,
            email: attributes.email,
			type: attributes.type
        }
    } 
})

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
        userId: number;
		DatabaseUserAttributes: {
			name: string;
			email: string;
			type: string;
		};
	}
}

export const getUser = cache(async () => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) return null;
	const { user, session } = await lucia.validateSession(sessionId);
	try {
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
	} catch {
		// Next.js throws error when attempting to set cookies when rendering page
	}
	return user;
});

export const validateRequest = cache(
	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null
			};
		}

		const result = await lucia.validateSession(sessionId);
		// next.js throws when you attempt to set cookie when rendering page
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch {}
		return result;
	}
);

export async function logout(): Promise<ActionResult> {
	"use server";
	const { session } = await validateRequest();
	if (!session) {
	  return {
		error: "Unauthorized",
	  };
	}
  
	await lucia.invalidateSession(session.id);
  
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(
	  sessionCookie.name,
	  sessionCookie.value,
	  sessionCookie.attributes
	);
	return redirect("/");
  }
  
  interface ActionResult {
	error: string;
  }
  