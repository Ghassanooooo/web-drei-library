"use client";
import Modal from "../components/modal";
import { trpc } from "@/modules/shared/utils/trpc";
import { useState } from "react";
import Main from "../features/main";
import { DashboardHeader } from "@/modules/shared/components/header";
import { FolderCreateButton } from "@/modules/shared/components/folder-create-button";
import { EmptyPlaceholder } from "@/modules/shared/components/empty-placeholder";
import { buttonVariants } from "@/modules/shared/components/ui/button";
import { cn } from "@/modules/shared/lib/utils";
import { Card } from "@/modules/shared/components/ui/card";

function Library() {
  const utils = trpc.useContext();
  const { data, isLoading }: any = trpc.getFolders.useQuery(
    // @ts-ignore
    undefined,
    {
      onSuccess: (data: any) => {
        // retux store
        // useStore.setState({ indexh: data.indexh, indexv: data.indexv });
      },
    }
  );

  const { mutate } = trpc.createFolder.useMutation({
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
  return !isLoading ? (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        openModal={openModal}
        actionName="Create"
        label="Name Folder"
        onSubmit={onCreateFolder}
      />
      <DashboardHeader heading="Library" text="Create and manage folders.">
        <FolderCreateButton openModal={openModal} />
      </DashboardHeader>
      {data?.length ? (
        <Main data={data} />
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="folder" />
          <EmptyPlaceholder.Title>No folders created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any folders yet. Start creating content.
          </EmptyPlaceholder.Description>
          <FolderCreateButton
            openModal={openModal}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "text-slate-900"
            )}
          />
        </EmptyPlaceholder>
      )}
    </>
  ) : (
    <div className="grid gap-10">
      <Card.Skeleton />
      <Card.Skeleton />
    </div>
  );
}

// @ts-ignore
export default trpc.withTRPC(Library);
