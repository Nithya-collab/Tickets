import Aggregate from "@/components/UI/Aggregate";
import { fetchTasksByUser } from "@/db/queries/tasks";
import { User } from "lucia";

interface OrganizerProps {
  user: User;
}

export default async function Organizer(props: OrganizerProps) {
  const tasks = await fetchTasksByUser(props.user);
  console.log(tasks);
  return (
    <>
      <h1 className="text-2xl md:text-5xl text-center">Organizer dashboard</h1>
      <Aggregate heading="Events" sub="current" aggregate="45" />
      <Aggregate heading="Workers" sub="online" aggregate="4" />
      <Aggregate heading="Tasks" sub="active" aggregate="23" />
      <Aggregate heading="Sales" sub="today" aggregate="45$" />
    </>
  );
}
