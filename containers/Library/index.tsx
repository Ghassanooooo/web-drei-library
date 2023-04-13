"use client";
import Modal from "./Modal";
import { trpc } from "@/utils/trpc";

import { IoMdAdd } from "react-icons/io";
import { BiFolder } from "react-icons/bi";
function Library() {
  return (
    <>
      <p className="text-gray-700 text-3xl mb-16 font-bold">Library</p>

      <div className="grid mb-4 ">
        <div className="rounded px-4 bg-white h-16 shadow-sm flex items-center cursor-pointer">
          <Modal>
            <div className="rounded h-10 border-2 flex px-2 items-center">
              <div>
                <IoMdAdd className="m-auto text-lg" />
              </div>
              <div className="pl-2">Folder</div>
            </div>
          </Modal>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 bg-white shadow-sm p-4 min-h-screen">
        <div className="rounded bg-white shadow-sm flex cursor-pointer border-2 h-10 w-60">
          <div className="border-r-2 px-2 flex items-center justify-center grow-0">
            <BiFolder className="text-lg" />
          </div>
          <div className="border-r-2 px-2 flex items-center justify-center grow">
            Default
          </div>
          <div className="px-2 flex items-center justify-center  grow-0">3</div>
        </div>
      </div>
    </>
  );
}

// @ts-ignore
export default trpc.withTRPC(Library);
