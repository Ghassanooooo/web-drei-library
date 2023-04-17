"use client";
import { useState } from "react";

import { DashboardHeader } from "@/containers/header";
import { FolderOperations } from "@/containers/folder-operations";
import { useGetFolderQuery } from "@/store/services/dashboardService";
function FolderPage({ id }: any) {
  const { data, isLoading, isSuccess, isError, error }: any =
    useGetFolderQuery(id);

  let [isOpen, setIsOpen] = useState(false);

  const onEditFolder = (e: any) => {
    e.preventDefault();
    // mutate({ title: e.target.title.value, id: data?.id });
  };
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <div className="relative z-10">
      <DashboardHeader
        heading="Folder"
        text={`Manage (${data?.title}) folder.`}
      >
        <FolderOperations folder={data} />
      </DashboardHeader>
    </div>
  );
}

export default FolderPage;
