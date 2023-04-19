//import { notFound } from "next/navigation";

import { dashboardConfig } from "@/config/dashboard";
import { MainNav } from "@/containers/main-nav";
import { StudioNav } from "@/containers/studio-nav";
import { UserAccountNav } from "@/containers/user-account-nav";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="mx-auto flex flex-col space-y-6">
      <header className=" bg-white ">
        <div className="flex h-[4vh] px-4 items-center justify-between border-b border-b-slate-200 py-4">
          <MainNav items={dashboardConfig.mainNav} />
          <UserAccountNav
            user={{
              name: "John Doe",
              image: "/man-smiling.jpg",
              email: "test@gmail.com",
            }}
          />
        </div>
      </header>
      <div
        className=" grid grid-cols-8 min-h-[96vh] mt-0"
        style={{ marginTop: 0 }}
      >
        <aside className="flex-col md:flex border-r col-span-1 px-3 pr-4 overflow-y-auto full-screen">
          <StudioNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden  col-span-6">
          {children}
        </main>
        <aside className="flex-col md:flex border-l col-span-1 px-3 pr-4 overflow-y-auto full-screen">
          <StudioNav items={dashboardConfig.sidebarNav} />
        </aside>
      </div>
    </div>
  );
}
