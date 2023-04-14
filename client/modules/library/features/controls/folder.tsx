import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import FolderSettings from "../../components/folderSettings";
export default function FolderControl({ openModal, data }: any) {
  return (
    <li>
      <FolderSettings openModal={openModal} data={data} />
    </li>
  );
}
