import React from "react";
import { IoMdAdd } from "react-icons/io";

export default function Control({ openModal }: any) {
  return (
    <div className="grid mb-4 ">
      <div className="rounded px-4 bg-white h-16 shadow-sm flex items-center cursor-pointer">
        <div
          onClick={openModal}
          className="rounded h-10 border-2 flex px-2 items-center"
        >
          <div>
            <IoMdAdd className="m-auto text-lg" />
          </div>
          <div className="pl-2">Folder</div>
        </div>
      </div>
    </div>
  );
}
