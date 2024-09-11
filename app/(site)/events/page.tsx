import { fetchAllEvents } from "@/db/queries/events";
import Link from "next/link";

export default async function Home() {
  const events = await fetchAllEvents();

  return (
    <main className="flex min-h-screen flex-col p-24">
      <h1 className="text-3xl md:text-5xl">All Upcoming Events</h1>
      <section className="max-w-7xl mt-12">
        <h3 className="text-xl md:text-3xl">list of all upcoming events</h3>
        <table className="mt-12">
          <thead>
            <tr className="text-left">
              <th className="p-1 md:p-3">Name</th>
              <th className="p-1 md:p-3">Description</th>
              <th className="p-1 md:p-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="p-1 md:p-3">
                  <Link href={`/events/${event.id}`}>{event.name}</Link>
                </td>
                <td className="p-1 md:p-3">{event.description}</td>
                <td className="p-1 md:p-3">{event.start_time.toLocaleDateString()}</td>
              </tr>
              ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}