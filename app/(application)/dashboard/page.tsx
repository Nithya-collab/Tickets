import { getUser } from "@/lib/auth";
import { User } from "lucia";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
const Attendee = dynamic(() => import("./attendee"), { ssr: false });
const Organizer = dynamic(() => import("./organizer"), { ssr: false });
const Coordinator = dynamic(() => import("./coordinator"), { ssr: false });
const Operator = dynamic(() => import("./operator"), { ssr: false });

export default async function Home() {
    const user = await getUser();
    if (!user) redirect("/");
    // const dateOptions: Intl.DateTimeFormatOptions = { // Options for formatting dates.
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric'
    // };

    // dynmaically render the component based on the user registration type
    function userComponent(user: User) {
        if (user.type == "organizer") {
            return <Organizer user={user} />;
        } else if (user.type == "coordinator") {
            return <Coordinator user={user} />;
        } else if (user.type == "operator") {
            return <Operator user={user} />;
        } else {
            return <Attendee user={user} />;
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-start xl:p-24">
            <div className="mb-4">
                {/* { if(user?.type == "Organizer") { <Organizer></Organizer> } else if <Attendee></Attendee>} */}
                {userComponent(user)}
            </div>
        </main>
    );
}
