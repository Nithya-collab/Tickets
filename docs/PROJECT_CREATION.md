# Project creation

start creating the project with <code>npx create-next-app@latest</code>

select the default options (for all)

### About Typescript

Typescript is used for auto-completion in IDE (no need to learn typescript upfront)
Typescript - Javascript written with strict types. It is basically a javascript (flavor)


### create routes by just creating a folder inside app/   ( Nextjs - App router )

i've created a folder app/about and a page.tsx file inside it. 

if you go to <code>localhost:3000/about</code>, the contents of the app/about/page.tsx will be rendered

Try for yourself. just create folder inside app/ and a page.tsx (typescript version of JSX or Plain JSX), then load <code>localhost:3000/yourfoldername</code>

### fetch data with the (web) fetch API

I've created a events route to demonstrate the usual way of basic data fetching in nextjs.

open <code>app/events/page.tsx</code> file, at the top fetch api is used with javascript await;

<code>const res = await fetch('https://jsonplaceholder.typicode.com/users');</code>

NOTE: The (react) component also made asynchronous with async keyword

<code>export default async function Home() { ...</code>

The asynchronous requests (AJAX) runs in the background and returns the data as soon as it is available or throws an exception if request failed. [Learn More](https://developer.mozilla.org/docs/Web/API/Fetch_API) 

<code>const users = await fetchUsers();</code>. The data is then used to populate the table.

The history of data fetching along the years in next js. see this [blog post](https://joelolawanle.com/posts/data-fectching-nextjs-14). we only focus on the latest version (nextjs 14)


2. Dynamic Routing for each resource (eg: user)

create a folder <code>app/events/[id]</code>. This is the convention in nextjs14 for matching url search parameters
place the resource (user) display logic in the <code>app/events/[id]/page.tsx</code> UI file.

see nextjs [dynamic routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes) conventions

### creating navigation links (bar) 

Add the Site navigation links markup in <code>app/layout.tsx</code> which is the

[root layout](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required) of the (nextjs14) app that is preserved between route navigation

see the [file app/layout.tsx](https://github.com/charles-prof/event-show-management/blob/next/app/layout.tsx) for reference

### connecting to a database in nextjs

connecting to database in nextjs is same as connecting to database in nodejs
as nextjs runs (built up on) in the nodejs environment

nextjs interacts with database through a database orm (or direct db drivers).

1. Initiate an ORM (prisma) 

<code>export const db = new PrismaClient() // Creating a new instance of PrismaClient.</code>

2. Start querying the database

<code>return await db.$queryRaw`SELECT * FROM users`</code>

All right. Steps to setup prisma (3 steps)

1. Install Prisma <code>npm install prisma --save-dev</code>

2. Choose a database service provider (server - mysql/sqlite/postgres/etc) 
   <code>npx prisma init --datasource-provider sqlite</code>

This will create a .env file and a prisma directory with a schema.prisma file.

3. Add database connection details in .env file 

  <code>DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"</code>

After setting up prisma in the nextjs app, next there are two ways to get started.

Follow along and read this [Learning Guide](https://github.com/charles-prof/event-show-management/blob/next/docs/LEARNING.md)
