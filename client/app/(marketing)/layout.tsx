import Link from "next/link";

import { marketingConfig } from "@/modules/shared/config/marketing";
import { cn } from "@/modules/shared/lib/utils";
import { MainNav } from "@/modules/shared/components/main-nav";
import { SiteFooter } from "@/modules/shared/components/site-footer";
import { buttonVariants } from "@/modules/shared/components/ui/button";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container sticky top-0 z-40 bg-white">
        <div className="flex h-16 items-center justify-between border-b border-b-slate-200 py-4">
          <MainNav items={marketingConfig.mainNav} />
          <nav>
            <Link
              href="/login"
              className={cn(buttonVariants({ size: "sm" }), "px-4")}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
