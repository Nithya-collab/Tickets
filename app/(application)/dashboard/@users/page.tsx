// Importing the function to fetch users from the database.
import { fetchUsers } from "@/db/queries/users";
import { User } from "@prisma/client";
import Link from "next/link";

export default async function Home() {

    const users = await fetchUsers() // Fetching the users from the database.
    const dateOptions: Intl.DateTimeFormatOptions = { // Options for formatting dates.
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return (
        <main className="flex min-h-screen flex-col items-start p-24">
      <div className="mb-4">
        <table className="mt-12">
          <thead>
            <tr className="text-left">
              <th className="p-1 md:p-3">Name</th>
              <th className="p-1 md:p-3">Email</th>
              <th className="p-1 md:p-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user:User) => (
              <tr key={user.id}>
                <td className="p-1 md:p-3">
                  <Link href={`/dashboard/${user.id}`}>{user.name}</Link>
                </td>
                <td className="p-1 md:p-3">{user.email}</td>
                <td className="p-1 md:p-3">{user.type}</td>
              </tr>
              ))}
          </tbody>
        </table>
      </div>
    </main>
    );
}