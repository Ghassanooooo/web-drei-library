"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoLibraryOutline } from "react-icons/io5";
import { MdSlideshow, MdManageAccounts } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import Image from "next/image";

const SideBar = forwardRef(({ showNav }: any, ref: any) => {
  const router: any = useRouter();

  return (
    <div ref={ref} className="fixed w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <Link href="/lessons">
            <Image
              alt="company logo"
              className="w-32 h-auto"
              src="/ferox-transparent.png"
              width={100}
              height={100}
            />
          </Link>
        </picture>
      </div>

      <div className="flex flex-col">
        <Link href="/lessons">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/lessons"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <MdSlideshow className="h-5 w-5" />
            </div>
            <div>
              <p>Lessons</p>
            </div>
          </div>
        </Link>
        <Link href="/library">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center
             cursor-pointer mb-3 flex items-center transition-colors ${
               router.pathname == "/"
                 ? "bg-orange-100 text-orange-500"
                 : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
             }`}
          >
            <div className="mr-2">
              <IoLibraryOutline className="h-5 w-5" />
            </div>
            <div>
              <p>Library</p>
            </div>
          </div>
        </Link>
        <Link href="/reports">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/reports"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <TbReportAnalytics className="h-5 w-5" />
            </div>
            <div>
              <p>Reports</p>
            </div>
          </div>
        </Link>
        <Link href="/account">
          <div
            className={`pl-6 py-3 mx-5 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
              router.pathname == "/account"
                ? "bg-orange-100 text-orange-500"
                : "text-gray-400 hover:bg-orange-100 hover:text-orange-500"
            }`}
          >
            <div className="mr-2">
              <MdManageAccounts className="h-5 w-5" />
            </div>
            <div>
              <p>Account</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
});

SideBar.displayName = "SideBar";

export default SideBar;
