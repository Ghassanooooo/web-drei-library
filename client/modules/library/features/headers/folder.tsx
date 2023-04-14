import React from "react";
import { IoLibraryOutline } from "react-icons/io5";

export default function FolderHeader() {
  return (
    <>
      {" "}
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
    </>
  );
}
