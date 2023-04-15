import Link from "next/link";
import React from "react";

import { BiFolder } from "react-icons/bi";
export default function Folder({ data }: any) {
  console.log(data, "data");
  return (
    <Link
      href={"/library/folder/" + data.id}
      className="shadow-sm flex cursor-pointer h-10 border  rounded-md  border-slate-200"
    >
      <div className="border-r px-2 flex items-center justify-center grow-0">
        <BiFolder className="text-lg" />
      </div>
      <div className="border-r px-2 flex items-center justify-center grow">
        {data.title}
      </div>
      <div className="px-2 flex items-center justify-center  grow-0">
        {data.totalContent}
      </div>
    </Link>
  );
}
