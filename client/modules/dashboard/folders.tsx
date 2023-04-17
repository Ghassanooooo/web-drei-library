"use client";
import { Fragment, useState } from "react";
import { DashboardHeader } from "@/containers/header";
import { FolderCreateButton } from "@/containers/folder-create-button";
import { EmptyPlaceholder } from "@/containers/empty-placeholder";
import { Button, buttonVariants } from "@/components/button";
import { cn } from "@/lib/utils";
import { Card } from "@/components/card";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { AlertDialog, AlertDialogContent } from "@/components/alert-dialog";
import Link from "next/link";
import {
  useCreateFolderMutation,
  useGetFoldersQuery,
} from "@/store/services/foldersService";
import { Icons } from "@/containers/icons";

function FoldersPage() {
  const [creareFolder] = useCreateFolderMutation();
  const { data, isLoading, isSuccess, isError, error }: any =
    useGetFoldersQuery(null);

  let [showCreateFolderAlert, setShowCreateFolderAlert] = useState(false);

  const onCreateFolder = async (e: any) => {
    e.preventDefault();
    await creareFolder({ title: e.target.title.value });
    setShowCreateFolderAlert(false);
  };

  return !isLoading ? (
    <>
      <DashboardHeader heading="Folders" text="Create and manage folders.">
        <FolderCreateButton setShowAlert={setShowCreateFolderAlert} />
      </DashboardHeader>
      <FolderCreateAlertDialog
        onSubmit={onCreateFolder}
        showAlert={showCreateFolderAlert}
        setShowAlert={setShowCreateFolderAlert}
      />
      {data?.length ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 bg-white shadow-sm p-4 min-h-screen auto-rows-min">
          {data?.map((folder: any, index: number) => {
            return (
              <Link
                key={index}
                href={"/folders/folder/" + folder.id}
                className="shadow-sm flex cursor-pointer h-10 border  rounded-md  border-slate-200"
              >
                <div className="border-r px-2 flex items-center justify-center grow-0">
                  <Icons.folder className="mr-2 h-4 w-4" />
                </div>
                <div className="border-r px-2 flex items-center justify-center grow">
                  {folder.title}
                </div>
                <div className="px-2 flex items-center justify-center  grow-0">
                  {folder.totalContent}
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="folder" />
          <EmptyPlaceholder.Title>No folders created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any folders yet. Start creating content.
          </EmptyPlaceholder.Description>
          <FolderCreateButton
            setShowAlert={setShowCreateFolderAlert}
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

function FolderCreateAlertDialog({ onSubmit, showAlert, setShowAlert }: any) {
  return (
    <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
      <AlertDialogContent>
        <form onSubmit={onSubmit}>
          <div className="grid gap-1">
            <Label htmlFor="name" className="mb-4">
              Folder Name
            </Label>
            <Input id="name" className="w-[full]" size={32} name="title" />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => setShowAlert(false)}
              type="button"
              className="bg-white text-slate-800 border hover:bg-slate-100"
            >
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default FoldersPage;
