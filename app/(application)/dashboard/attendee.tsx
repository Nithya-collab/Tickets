import Aggregate from "@/components/UI/Aggregate";
import { fetchTasksByUser } from "@/db/queries/tasks";
import { User } from "lucia";

interface AttendeeProps {
  user: User
}

export default async function Attendee(props: AttendeeProps) {

  const tasks = await fetchTasksByUser(props.user)
  console.log(props.user)
  return (
    <>
      <h1 className="text-2xl md:text-5xl text-center">Welcome to dashboard</h1>
      <div className="grid gap-y-12 mt-12 gap-6 lg:gap-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Aggregate heading="Events" sub="This week" aggregate="2" />
        <Aggregate heading="Friends" sub="online" aggregate="4" />
        <Aggregate heading="Tasks" sub="active" aggregate="3" />
        <Aggregate heading="Tickets" sub="for next event" aggregate="12" />
      </div>
    </>
  );
}
