"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

import { Icons } from "@/containers/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { Label } from "@/components/label";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import {
  useDeleteFolderMutation,
  useUpdateFolderMutation,
} from "@/store/services/dashboardService";

export function FolderOperations({ folder }: any) {
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [showRenameAlert, setShowRenameAlert] = React.useState<boolean>(false);

  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-slate-50">
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setShowRenameAlert(true)}>
            Rename
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-red-600 focus:bg-red-50"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <FolderDeleteAlertDialog
        utils={null}
        showAlert={showDeleteAlert}
        setShowAlert={setShowDeleteAlert}
        setIsLoading={setIsDeleteLoading}
        isLoading={isDeleteLoading}
        folder={folder}
      />

      <FolderRenameAlertDialog
        utils={null}
        showAlert={showRenameAlert}
        setShowAlert={setShowRenameAlert}
        setIsLoading={setIsDeleteLoading}
        folder={folder}
      />
    </>
  );
}

function FolderRenameAlertDialog({ folder, showAlert, setShowAlert }: any) {
  const router = useRouter();
  const [updateFolder] = useUpdateFolderMutation();
  const onUpdateFolder = async (e: any) => {
    e.preventDefault();
    console.log(e.target.title.value, "  onUpdateFolder");
    await updateFolder({ title: e.target.title.value, id: folder?.id });
    setShowAlert(false);
  };
  return (
    <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
      <AlertDialogContent>
        <form onSubmit={onUpdateFolder}>
          <div className="grid gap-1">
            <Label htmlFor="name" className="mb-4">
              Folder Name
            </Label>
            <Input
              id="name"
              className="w-[full]"
              size={32}
              name="title"
              defaultValue={folder?.title}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button
              onClick={() => setShowAlert(false)}
              type="button"
              className="bg-white text-slate-800 border hover:bg-slate-100"
            >
              Cancel
            </Button>
            <Button type="submit">Rename</Button>
          </div>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function FolderDeleteAlertDialog({ folder, showAlert, setShowAlert }: any) {
  const router = useRouter();
  const [deleteFolder] = useDeleteFolderMutation();
  const isLoading = false;
  const onDeleteFolder = async (e: any) => {
    e.preventDefault();
    await deleteFolder(folder?.id);
    setShowAlert(false);
    router.back();
  };
  return (
    <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete ({folder?.title}) folder?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDeleteFolder}
            className="bg-red-600 focus:ring-red-600"
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.trash className="mr-2 h-4 w-4" />
            )}
            <span>Delete</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
