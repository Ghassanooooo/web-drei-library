"use client";
import Modal from "../components/modal";
import { trpc } from "@/modules/shared/utils/trpc";
import { useState } from "react";
import Header from "../features/headers";
import Main from "../features/main";
import Control from "../features/controls";
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

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        openModal={openModal}
        actionName="Create"
        label="Name Folder"
        onSubmit={onCreateFolder}
      />
      <Header title="Library" />
      <Control openModal={openModal} />

      <Main data={data} />
    </>
  );
}

// @ts-ignore
export default trpc.withTRPC(Library);
