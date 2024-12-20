"use client";

import Image from "next/image";
import { useState } from "react";

interface ShowPhotosProps {
  photos: any[];
}

export const ShowPhotos = ({ photos }: ShowPhotosProps) => {
  const [selectedImage, setSelectedImage] = useState<any>();

  const listPhotos = (photos: any[]) => {
    return photos?.map((photo: any) => {
      const myLoader = () => {
        return photo.url || "";
      };

      return (
        <>
          <Image
            src={photo.url}
            alt={photo.description}
            width={photo.width}
            height={photo.height}
            key={photo.url}
            loader={myLoader}
            className="w-[12rem] cursor-pointer rounded-md"
            onClick={() => {
              setSelectedImage(photo);
              // @ts-ignore
              document?.getElementById("view-image-modal")?.showModal?.();
            }}
          />
        </>
      );
    });
  };

  const myLoader = () => {
    return selectedImage?.url || "";
  };

  return (
    <div className="columns-1 mx-auto sm:columns-2 md:columns-3 lg:columns-4 gap-2 space-y-3 p-3 list-photos">
      {listPhotos(photos)}

      <dialog
        id="view-image-modal"
        className="modal border-none outline-none focus:outline-none"
      >
        <div className="modal-box border-none">
          <Image
            src={selectedImage?.url}
            alt={selectedImage?.description}
            width={selectedImage?.width}
            height={selectedImage?.height}
            key={selectedImage?.url}
            loader={myLoader}
            className="min-w-10 rounded-md mt-0"
          />

          <h1 className="text-sm text-center">{selectedImage?.description}</h1>
        </div>
        <form
          method="dialog"
          className="modal-backdrop border-none outline-none focus:outline-none"
        >
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};
