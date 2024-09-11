import Aggregate from "@/components/UI/Aggregate";
import { fetchTasksByUser } from "@/db/queries/tasks";
import { User } from "lucia";

interface CoordinatorProps {
  user: User;
}

export default async function Coordinator(props: CoordinatorProps) {
  const tasks = await fetchTasksByUser(props.user);
  // const events = await fetchAssignedEvents(props.user); // event schedule/collision

  return (
    <>
      <h1 className="text-2xl md:text-5xl text-center">Coordinator dashboard</h1>
      <div className="grid gap-y-12 mt-12 gap-6 lg:gap-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Aggregate heading="Events" sub="current" aggregate="45" />
        <Aggregate heading="Colleagues" sub="online" aggregate="4" />
        <Aggregate heading="Tickets" sub="available" aggregate="23" />
        <Aggregate heading="Sales" sub="today" aggregate="45$" />
      </div>
    </>
  );
}
