"use client";
import Modal from "./Modal";
import { trpc } from "@/utils/trpc";

import { IoMdAdd } from "react-icons/io";

import Folder from "./Folder";
import { Fragment } from "react";
function Library() {
  const utils = trpc.useContext();
  const { isLoad, data, fetchNextPage, hasNextPage, isFetchingNextPage }: any =
    trpc.getFolders.useQuery(
      // @ts-ignore
      undefined,
      {
        onSuccess: (data: any) => {
          console.log(data, "  onSuccess");
          // retux store
          // useStore.setState({ indexh: data.indexh, indexv: data.indexv });
        },
      }
    );

  const { isLoading, mutate } = trpc.createFolder.useMutation({
    retry: false,
    onSuccess: (data: any) => {
      utils.getFolders.invalidate();
      console.log(data, "  createFolder");
    },
    onError: (err: any) => console.error(err.message),
  });

  const onCreateFolder = (e: any) => {
    e.preventDefault();
    mutate({ title: e.target.title.value });
  };
  return (
    <>
      <p className="text-gray-700 text-3xl mb-16 font-bold">Library</p>

      <div className="grid mb-4 ">
        <div className="rounded px-4 bg-white h-16 shadow-sm flex items-center cursor-pointer">
          <Modal onSubmit={onCreateFolder}>
            <div className="rounded h-10 border-2 flex px-2 items-center">
              <div>
                <IoMdAdd className="m-auto text-lg" />
              </div>
              <div className="pl-2">Folder</div>
            </div>
          </Modal>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 bg-white shadow-sm p-4 min-h-screen auto-rows-min">
        {data?.map((folder: any, index: number) => {
          return (
            <Fragment key={index}>
              <Folder title={folder.title} totalContent={folder.totalContent} />
            </Fragment>
          );
        })}
      </div>
    </>
  );
}

// @ts-ignore
export default trpc.withTRPC(Library);
