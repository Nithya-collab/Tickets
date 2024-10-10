import React from "react";
const MyNavigationMenu = () => {
    return (
        <>
            <h1 className="text-5xl p-4 sm:p-12">Event Management</h1>
            <div className="grid sm:grid-cols-3 p-4 sm:p-12 text-center">
                <div className="place-content-center sm:w-72 min-h-48 bg-gradient-to-tr from-sky-200 to-red-300">
                    1
                </div>
                <div className="place-content-center sm:w-72 min-h-48 bg-gradient-to-tr from-lime-200 to-teal-300">2</div>
                <div className="place-content-center sm:w-72 min-h-48 bg-gradient-to-tr from-emerald-200 to-fuchsia-300">3</div>
            </div>
        </>
    );
};

export default MyNavigationMenu;
