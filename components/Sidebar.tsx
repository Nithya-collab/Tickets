"use client";

import { useState } from "react";
import Dropdown from "./UI/Dropdown";
import Link from "next/link";

interface SidebarProps {
    // propie: string
    setState?: Function;
}

const Sidebar: React.FC<SidebarProps> = () => {
    const [isSidebarOpen, setisSidebarOpen] = useState(true);

    // let hideClasses = `bg-slate-300 absolute inset-y-0 md:static hidden md:block ${
    //   isSidebarOpen ? "w-[200px]" : "w-0"
    // }`;
    let hideClasses = `bg-slate-300 hidden md:block peer-aria-expanded:block"`;

    return (
        <div
            id="sidebar-nav-list"
            className={`flex-[0_0_200px] overflow-hidden ${hideClasses}`}
        >
            <Dropdown trigger="Events" triggerClasses="px-4 pt-4">
                <li className="list-none my-1 px-6">
                    <Link className="" href="/dashboard/events">
                        All Events
                    </Link>
                </li>
                <li className="list-none my-1 px-6">
                    <Link href="/dashboard/events/create">create Event</Link>
                </li>
            </Dropdown>
            <Dropdown trigger="Tickets" triggerClasses="px-4 pt-4">
                <li className="list-none my-1 px-6">
                    <Link className="" href="/dashboard/tickets">
                        All Tickets
                    </Link>
                </li>
                <li className="list-none my-1 px-6">
                    <Link href="/dashboard/tickets/create">create Ticket</Link>
                </li>
            </Dropdown>
            <Dropdown trigger="Tasks" triggerClasses="px-4 pt-4">
                <li className="list-none my-1 px-6">
                    <Link className="" href="/dashboard/tasks">
                        All Tasks
                    </Link>
                </li>
                <li className="list-none my-1 px-6">
                    <Link href="/dashboard/tasks/create">create Task</Link>
                </li>
            </Dropdown>
        </div>
    );
};

export default Sidebar;
