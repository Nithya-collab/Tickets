import Sidebar from "@/components/Sidebar";
import NavToggle from "@/components/UI/NavToggle";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { sidebarToggle } from "@/utils/client-utils";

// import '@/lib/vendor/svg-with-js.css'
// import dynamic from "next/dynamic";

// dynamic( () => import('@/lib/vendor/svg-with-js.css') )

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user = await getUser()
  if(!user) {redirect("/")}
  
  // (await import('@/lib/vendor/fontawesome')).default;
  // (await import('@/lib/vendor/regular')).default;

  // const isSidebarOpen, setIsSidebarOpen

  return (
    // <div className="grid grid-cols-[200px_1fr]">
    <div className="flex relative">
      <NavToggle positionClasses="md:hidden absolute -top-16 left-4" id="sidebar-toggle" toggleFunction={sidebarToggle}></NavToggle>
      <Sidebar></Sidebar>
        {/* <i className="fa fa-user w-8 h-8"></i> */}
      <div className="mx-auto">  
        {children}
      </div>
    </div>
  );
}
