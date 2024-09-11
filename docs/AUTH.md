# What is Authentication?

[Authentication is a term that refers to the process of proving that some fact or some document is **genuine**  ](https://auth0.com/intro-to-iam/what-is-authentication)

Similarly Web Application Authentication, usually a user proves their identity (*genuinity*) by providing their credentials (password/faceId/fingerprintId/device token with userId(username/email/phone)), that is, an *agreed piece of information shared between the user and the system.*

example of agreed piece of information

Something you know, for example, a password (email/password)

Something you have, for example, a smartphone (device token/mfa/otp)

Something you are, for example, biometric authentication (faceId/fingerprintId)

Basic explanation of [Authentication using password](https://blog.bytebytego.com/p/password-session-cookie-token-jwt) and [advanced oauth/passwordless](https://blog.bytebytego.com/p/password-session-cookie-token-jwt-ec1)

The three steps in session based authentication

1. **create a session** with sessionId and store securely (httpOnly cookie) in the user's browser cookie *after the user successfully logged in ( or signup )*

2. **validate session** by comparing the session in user's browser with the session stored in application server database *when the user is using the application*

3. **destroy the session** by deleting the browser cookie and the session (row) entry in the database *when the user logs out*

## Implementing Authentication in nextjs using lucia and oslo

Note: THe development can be fast forwarded by using generous free tier auth service like ory, logto, [supertokens](https://supertokens.com/), [clerk](https://clerk.com/),...

We use session based [Email/Password](https://lucia-auth.com/guides/email-and-password/basics) authentication.

*Here the agreed credentials **(ID/Secret pair)** are email and password* and the user is expected (responsible) for keeping the password secure to avoid unauthorized access.

#### Creating session ( when the user login )

While [sign in](https://lucia-auth.com/guides/email-and-password/basics#:~:text=%22lucia%22%3B-,Sign%20in%20user,-Create%20a%20/login) and [register](https://lucia-auth.com/guides/email-and-password/basics#:~:text=%3B%0A%7D-,Register%20user,-Create%20a%20/signup), we create session to identify the user. valid users are authenticated.

[lucia's api](https://lucia-auth.com/reference/main/Lucia) provides functions (methods) for [creating](https://lucia-auth.com/reference/main/Lucia/createSession) and [storing](https://lucia-auth.com/reference/main/Lucia/createSessionCookie) session cookie. 

```javascript
import { generateIdFromEntropySize } from "lucia";

	// cryptographically secure random string id
	const userId = generateIdFromEntropySize(10); // 16 characters long

	// create the session data and store it in the database using prisma orm adapter
	const session = await lucia.createSession(userId, {});

	// create a session cookie based on the created session, using session.id
	const sessionCookie = lucia.createSessionCookie(session.id); // set cookie in the browser
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

	return redirect("/"); // redirect to intended destination (dashboard or home)

```


#### validate session ( when the user using the application )

We use [lucia](https://lucia-auth.com/reference/main/Lucia)'s [session validation](https://lucia-auth.com/reference/main/Lucia/validateSession) in the [server actions](https://dev.to/jonathan-dev/nextjs-three-ways-to-call-server-actions-from-client-components-30p3) of the [nextjs app router](https://lucia-auth.com/guides/validate-session-cookies/nextjs-app)

After [sessionId](https://github.com/charles-prof/event-show-management/blob/bb0bc1133fa5234586023caa84e8f5969ec6f0f9/lib/auth.ts#L40) retrieved from the browser cookie, lucia's session validation api returns [authenticated user and session object with value](https://github.com/charles-prof/event-show-management/blob/bb0bc1133fa5234586023caa84e8f5969ec6f0f9/lib/auth.ts#L42) (or null if unauthenticated)

```javascript
const getUser = cache(async () => { // cache the function to reduces database roundtrip
	
    // browser cookie is being read and sessionId is retrieved
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	
    // if sessionId is null getUser returns null where you can throw notfound() exception or redirect to the login page
    if (!sessionId) return null; 
	
    // lucia.validateSession takes the sessionId and checks against the sessionId stored in the database then retrieves the authenticated User and Session object
    const { user, session } = await lucia.validateSession(sessionId);
	
    try {
		if (session && session.fresh) { // session.fresh indicates that the session is extended
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
		if (!session) { // if session objectt is null delete browser cookie by setting blank value
			const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		}
	} catch { // catch errors related to cookies
		// Next.js throws error when attempting to set cookies when rendering page
	}
	return user;
});

```
#### Destroy session ( when the user logout )

[To logout a user](https://lucia-auth.com/basics/sessions#:~:text=.attributes)%3B-,Invalidate%20sessions,-Use%20Lucia.invalidateSession) lucia provides two methods [invalidateSession()](https://lucia-auth.com/reference/main/Lucia/invalidateSession) [current device] and [invalidateUserSessions()](https://lucia-auth.com/reference/main/Lucia/invalidateUserSessions) [all devices]

```javascript
async function logout(): Promise<ActionResult> {
	"use server"; // This asynchronous function is marked as a server action
	
	/* getting session data using validateRequest() async function which retrieves 
	the session id from the browser cookie and matches against the database */
	const { session } = await validateRequest(); 
	if (!session) { // return error if session id matching failed
		return {
			error: "Unauthorized"
		};
	}

	// delete the session row record in the database using (prisma orm) database adapter
	await lucia.invalidateSession(session.id); // actual logout of a single device

	// set the blank cookie (delete cookie) after logout on the user's device (browser)
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	
	return redirect("/login"); // redirect the user to login screen
}
```

lucia's invalidateSession() uses the prisma adapter's [deleteSession method](https://github.com/lucia-auth/lucia/blob/cfe82514b72c9d5829ea61c12914417b9c6310bc/packages/adapter-prisma/src/index.ts#L19) to the session record in the database through prisma's model.delete() 

