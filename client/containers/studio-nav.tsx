"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarNavItem } from "@/types";
import { cn } from "@/lib/utils";
import { Icons } from "@/containers/icons";

interface StudioNavProps {
  items: SidebarNavItem[];
}

export function StudioNav({ items }: any) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2 pt-4">
      <div className="flex justify-between">
        <h3 className="text-sm font-semibold text-gray-500">
          Horizontal Slides
        </h3>
        <span className="text-md">
          <Icons.add>Icon</Icons.add>
        </span>
      </div>
      {items.map((item: any, index: any) => {
        const Icon = Icons[item.icon || "arrowRight"];
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "bg-white dark:bg-gray-200 shadow rounded-md pl-1 pr-14 py-2 flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 relative select-none ring-2 ring-emerald-400",
                  path === item.href ? "bg-slate-200" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
