"use client";

import React, { useState } from "react";

import { IoLibraryOutline } from "react-icons/io5";
import { AiFillCaretDown } from "react-icons/ai";
import FolderSettings from "@/components/Library/FolderSettings";
import Modal from "@/components/Library/Modal";
import { trpc } from "@/utils/trpc";
function Folder({ id }: any) {
  const utils = trpc.useContext();

  const { isLoading, mutate } = trpc.editFolder.useMutation({
    retry: false,
    onSuccess: (data: any) => {
      utils.getFolder.invalidate();
      console.log(data, "  createFolder");
    },
    onError: (err: any) => console.error(err.message),
  });
  const { isLoad, data, fetchNextPage, hasNextPage, isFetchingNextPage }: any =
    trpc.getFolder.useQuery(
      { id },
      {
        onSuccess: (data: any) => {
          console.log(data, "  onSuccess");
          // retux store
          // useStore.setState({ indexh: data.indexh, indexv: data.indexv });
        },
      }
    );

  let [isOpen, setIsOpen] = useState(false);

  const onEditFolder = (e: any) => {
    e.preventDefault();
    mutate({ title: e.target.title.value, id: data?.id });
  };
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className="relative z-10">
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        openModal={openModal}
        actionName="Rename"
        label="Rename Folder"
        onSubmit={onEditFolder}
        defaultValue={data?.title}
      />
      <div className="text-gray-700 text-3xl mb-4 font-bold ">
        <div className="text-sm breadcrumbs ">
          <ul>
            <li>
              <a>
                <IoLibraryOutline className="w-4 h-4 mr-2 stroke-current" />
                Library
              </a>
            </li>
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 mr-2 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  ></path>
                </svg>
                Folders
              </a>
            </li>
            <li>
              <FolderSettings openModal={openModal} data={data} />
            </li>
          </ul>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 bg-white shadow-sm p-4 min-h-screen auto-rows-min"></div>
    </div>
  );
}

// @ts-ignore
export default trpc.withTRPC(Folder);
