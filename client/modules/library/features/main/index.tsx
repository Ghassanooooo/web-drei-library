import React, { Fragment } from "react";
import Folder from "../../components/folder";

export default function Main({ data }: any) {
  return (
    <div className="grid grid-cols-5 gap-4 bg-white shadow-sm p-4 min-h-screen auto-rows-min">
      {data?.map((folder: any, index: number) => {
        return (
          <Fragment key={index}>
            <Folder data={folder} />
          </Fragment>
        );
      })}
    </div>
  );
}
