import { DashboardConfig } from "../types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Lessons",
      href: "/dashboard",
      icon: "monitor",
    },
    {
      title: "Library",
      href: "/dashboard/library",
      icon: "library",
    },
    {
      title: "Reports",
      href: "/dashboard/reports",
      icon: "chart",
    },

    {
      title: "Account",
      href: "/dashboard/account",
      icon: "user",
    },
  ],
};
