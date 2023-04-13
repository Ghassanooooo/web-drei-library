import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { IoMdAdd } from "react-icons/io";

const Layout: any = dynamic(() => import("../../containers/Layout/Layout"), {
  ssr: false,
});
async function Index() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <p className="text-gray-700 text-3xl mb-16 font-bold">Lessons</p>

      <div className="grid grid-cols-5 gap-4 bg-white shadow-sm p-4 ">
        <Link
          href="/studio"
          className="rounded cursor-pointer bg-white h-40 shadow-sm border-2 border-dashed flex justify-center items-center"
        >
          <div>
            <div>
              <IoMdAdd className="m-auto text-3xl" />
            </div>
            <div>Create</div>
          </div>
        </Link>
        <div className="rounded h-40 shadow-sm p-2">
          <Image
            className="w-full h-full object-contain"
            alt=""
            src="/react.png"
            width={215}
            height={160}
          />
        </div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
        <div className="rounded bg-red-500 h-40 shadow-sm"></div>
      </div>
    </Suspense>
  );
}

export default Index;
