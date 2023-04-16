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
      href: "/lessons",
      icon: "monitor",
    },
    {
      title: "Library",
      href: "/library",
      icon: "library",
    },
    {
      title: "Reports",
      href: "/reports",
      icon: "chart",
    },

    {
      title: "Account",
      href: "/account",
      icon: "user",
    },
  ],
};
