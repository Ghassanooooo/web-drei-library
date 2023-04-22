"use client";
import Editor from "@/containers/editor";
import { Icons } from "@/containers/icons";
import MonacoEditor from "@/modules/monacoEditor";
import { Suspense, useState, useEffect, useRef } from "react";
import { useUpdateLessonsMutation } from "@/store/services/lessonsService";

function Studio({ lesson }: any) {
  const [isLeft, setIsLeft] = useState(true);
  const [isRight, setIsRight] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const [isBottom, setIsBottom] = useState(true);
  const editorValue = useRef(null);
  const [updateMarkdown]: any = useUpdateLessonsMutation();

  useEffect(() => {
    if (!isLeft) setIsRight(true);
    if (!isRight) setIsLeft(true);
    if (!isTop) setIsBottom(true);
    if (!isBottom) setIsTop(true);
  }, [isLeft, isRight, isTop, isBottom]);

  async function save() {
    const { data } = await updateMarkdown({
      content: editorValue.current,
      id: lesson.id,
    });
    console.log("here is the current model value:", editorValue.current);
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <button onClick={save}>save</button>
      <div className=" h-[100%] w-[100%] flex">
        <div
          style={{
            width: isLeft ? (isRight ? "50%" : "98%") : "2%",
          }}
          className={"h-[100%] w-[50%] relative"}
        >
          <span
            onClick={() => setIsLeft((pre) => !pre)}
            className="absolute top-0 right-0 bg-white z-50 cursor-pointer"
          >
            {isLeft ? <Icons.arrowLeft /> : <Icons.arrowRight />}
          </span>
          {isLeft && (
            <MonacoEditor
              editorValue={editorValue}
              content={lesson.content[0].data}
              id={lesson.id}
            />
          )}
        </div>

        <div
          style={{ width: isLeft ? (isRight ? "50%" : "2%") : "98%" }}
          className="w-[50%] relative"
        >
          <div
            style={{ height: isTop ? (isBottom ? "50%" : "95%") : "5%" }}
            className=" bg-blue-800 h-[50%] w-[100%] relative"
          >
            {isRight && (
              <span
                onClick={() => setIsTop((pre) => !pre)}
                className="absolute top-0  right-1/2 translate-x-1/2  bg-white z-10 cursor-pointer"
              >
                {isTop ? <Icons.arrowUp /> : <Icons.arrowDown />}
              </span>
            )}
          </div>
          <span
            onClick={() => setIsRight((pre) => !pre)}
            className="absolute top-1/2 -translate-y-1/2 left-0 bg-white z-10 cursor-pointer"
          >
            {isRight ? <Icons.arrowRight /> : <Icons.arrowLeft />}
          </span>
          <div
            style={{ height: isTop ? (isBottom ? "50%" : "5%") : "95%" }}
            className=" bg-red-300 h-[50%] w-[100%] relative"
          >
            {isRight && (
              <span
                onClick={() => setIsBottom((pre) => !pre)}
                className="absolute top-0 right-1/2 translate-x-1/2 bg-white z-10 cursor-pointer"
              >
                {isBottom ? <Icons.arrowDown /> : <Icons.arrowUp />}
              </span>
            )}
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default Studio;

/**
 * 
 * import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
  resizeHandles: "e" | "w" | "s" | "n" | "se" | "sw" | "ne" | "nw";
  isLeft: boolean;
  width: number;
  setWidth: (w: number) => void;
}
 const Resizable: React.FC<ResizableProps> = ({
  children,
  direction,
  resizeHandles,
  isLeft,
  width,
  setWidth,
}) => {
  let resizableProps: ResizableBoxProps;
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  useEffect(() => {
    const listener = () => {
      let timer: any;

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.7 < width) {
          setWidth(window.innerWidth * 0.7);
        }
      }, 400);
    };
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [width, setWidth]);

  if (direction === "horizontal") {
    resizableProps = {
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.7, Infinity],

      height: Infinity,
      width,
      resizeHandles: [resizeHandles],
      onResizeStop: (e: any, data: any) => {
        console.log(data.size.width, " width");
        let w = width;
        if (isLeft) {
          w = data.size.width;
        } else {
          w = width - data.size.width;
        }

        setWidth(w);
      },
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],

      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
    };
  }
  return (
    <ResizableBox
      className={`h-[100%] w-[100%] flex ${
        resizeHandles === "w" ? "flex-row-reverse" : ""
      } `}
      {...resizableProps}
    >
      {children}
    </ResizableBox>
  );
}; 
 
 */
