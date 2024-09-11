// Importing the function to fetch users from the database.
import { fetchUsers } from "@/db/queries/users";
import { fetchTasksByUser } from "@/db/queries/tasks";
import { User } from "lucia";
import Aggregate from "@/components/UI/Aggregate";

interface OperatorProps {
  user: User;
}

export default async function Operator(props: OperatorProps) {
  const tasks = await fetchTasksByUser(props.user);
  console.log(tasks);
  const users = await fetchUsers(); // Fetching the users from the database.
  // const dateOptions: Intl.DateTimeFormatOptions = { // Options for formatting dates.
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric'
  // };

  return (
    <>
      <h1 className="text-2xl md:text-5xl text-center">Operator dashboard</h1>
      <Aggregate heading="Users" sub="MAU" aggregate="45" />
      <Aggregate heading="Traffic" sub="Bandwith" aggregate="4" />
      <Aggregate heading="Staffs" sub="active" aggregate="23" />
      <Aggregate heading="Bills" sub="today" aggregate="45" />
    </>
  );
}
