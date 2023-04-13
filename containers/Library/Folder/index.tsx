import React from "react";

import { BiFolder } from "react-icons/bi";
export default function Folder({
  title,
  totalContent,
}: {
  title: string;
  totalContent: number;
}) {
  return (
    <div className="rounded bg-white shadow-sm flex cursor-pointer border-2 h-10">
      <div className="border-r-2 px-2 flex items-center justify-center grow-0">
        <BiFolder className="text-lg" />
      </div>
      <div className="border-r-2 px-2 flex items-center justify-center grow">
        {title}
      </div>
      <div className="px-2 flex items-center justify-center  grow-0">
        {totalContent}
      </div>
    </div>
  );
}
