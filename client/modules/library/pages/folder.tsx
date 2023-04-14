"use client";
import { useState } from "react";
import FolderSettings from "@/modules/library/components/folderSettings";
import Modal from "@/modules/library/components/modal";
import { trpc } from "@/modules/shared/utils/trpc";
import FolderMain from "../features/main/folder";
import FolderHeader from "../features/headers/folder";
import FolderControl from "../features/controls/folder";
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
            <FolderHeader />
            <FolderControl openModal={openModal} data={data} />
          </ul>
        </div>
      </div>
      <FolderMain />
    </div>
  );
}

// @ts-ignore
export default trpc.withTRPC(Folder);
