//import { notFound } from "next/navigation";

import { dashboardConfig } from "@/config/dashboard";
import { MainNav } from "@/containers/main-nav";
import { DashboardNav } from "@/containers/nav";
import { UserAccountNav } from "@/containers/user-account-nav";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="mx-auto flex flex-col space-y-6">
      <header className="container sticky top-0 z-40 bg-white">
        <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
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
      <div className="container grid gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={dashboardConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
