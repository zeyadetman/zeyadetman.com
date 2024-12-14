"use client";
import Image from "next/image";

export const MdxImage = (props: any) => {
  const myLoader = () => {
    return props.src || "";
  };

  return (
    <Image
      alt={props.alt || " "}
      src={props.src || ""}
      loader={myLoader}
      className={`w-full mx-auto ${props.className}`}
      {...props}
      width={props.width || 400}
      height={props.height || 20}
    />
  );
};
