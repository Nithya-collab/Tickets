# Getting Started with Prisma

After setting up prisma, you can write (or copy/paste) [Prisma Schema (Prisma ORM configuration file)](https://github.com/charles-prof/event-show-management/blob/next/prisma/schema.prisma)

you normally define the database model in this Prisma Schema configuration file 

[see this example](https://www.prisma.io/docs/orm/prisma-schema/overview#example)

After configuring the Prisma schema run <code>npx prisma db push</code>
This command creates tables in the connected database using the prisma schema (db models)

Then run <code>npx schema migrate dev --name name-of-migration</code>
This command run the migration (commits) and keeps track of schema changes.

2nd approach: The inverse of the above approach

if you have a database already with schema (DDL), you can 
run <code>npx prisma db pull</code> to generate prisma schema

Then run <code>npx schema migrate dev --name name-of-migration</code>

> db push/pull synchronize the schema (db schema <=> prisma schema)


Finally run<code>npx prisma studio</code>

It open up a webpage in browser using <code>http://localhost:5555</code>

Now you can view/analyze and edit data in the [Prisma Studio](https://www.prisma.io/docs/orm/tools/prisma-studio#edit-data)

# Getting Started with Lucia (lucia-auth.com) and oslo (oslo/password) 

Lucia-auth provides session management, authentication wrapper API for Nextjs
Its APi provides helpful methods like **createSessionCookie, validateSession, invalidateSession** - for handling sessions and maintain [secure application state](https://beaglesecurity.com/blog/article/session-security.html)

Lucia works seamlessly with prisma ORM (through its database adapters), especially
**getUserAttributes** method on the Lucia instance (created with prisma ORM adapter)
retrieves the attributes (database columnfields) from the prisma model *to create the stripped version of User model, Session model for authentication puropose* 

we use Lucia's [Email/Password authentication](https://lucia-auth.com/guides/email-and-password/basics) method. Follow this [Authentication Guide](https://github.com/charles-prof/event-show-management/blob/next/docs/LEARNING.md) to learn about implementation.

Oslo.js is a companion library to Lucia which provides packages for handling [hashing passwords](https://oslo.js.org/reference/password/), [JWT tokens](https://jwt.io/introduction), [OAuth 2.0 clients ( Google signin)](https://oslo.js.org/reference/oauth2/), generating [OTP](https://otp.oslojs.dev/),..

we use [Bcrypt - for backwards compatibility](https://oslo.js.org/reference/password/Bcrypt/).
 (in signup and signin routes).
