import dynamic from "next/dynamic";
import { DashboardShell } from "@/containers/shell";

export const metadata = {
  title: "Settings",
  description: "Manage account and website settings.",
};

export default async function account() {
  return <DashboardShell>account</DashboardShell>;
}
