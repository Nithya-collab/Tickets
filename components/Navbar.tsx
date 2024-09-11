import { User } from "lucia";
import Dropdown from "./UI/Dropdown";
import NavToggle from "./UI/NavToggle";
import { navToggle } from "@/utils/client-utils";
import Link from "next/link";
import React from "react";

interface NavbarProps {
    user?: User | null;
    logout?: (formData: FormData) => void;
    children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ user, logout, children }) => {
    return (
        <>
            <nav className="flex justify-between font-medium text-lg sm:justify-around items-center bg-pink-300 text-gray-800 dark:bg-red-900 ">
                <ul
                    id="main-nav-list"
                    className="invisible sm:visible sm:flex px-4"
                >
                    {children}
                </ul>
                {/* <a href="/signout">Sign Out</a> */}
                {user ? (
                    <Dropdown
                        triggerClasses="text-sm mr-4"
                        dropTargetClasses="absolute pr-8 z-10 top-16 w-28 text-right"
                        trigger={user.name}
                    >
                        {/* <small className="">{user.name}</small> */}
                        <Link href="/dashboard" className="text-sm">
                            Dashboard
                        </Link>{" "}
                        <br />
                        <Link href="/dashboard/profile" className="text-sm">
                            Profile
                        </Link>
                        <form action={logout}>
                            <button type="submit" className="text-sm">
                                Sign Out
                            </button>
                        </form>
                    </Dropdown>
                ) : (
                    <div>
                        <Link
                            href="/signin"
                            className="text-lg invisible sm:visible hover:text-white hover:bg-orange-700 dark:text-orange-200 py-2 px-4"
                        >
                            Sign In
                        </Link>
                    </div>
                )}
            </nav>
            {!user ? (
                <NavToggle
                    positionClasses="sm:hidden absolute right-8 top-2"
                    id="main-nav-toggle"
                    toggleFunction={navToggle}
                />
            ) : null}
        </>
    );
};

export default Navbar;
