"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { RiDeleteBin4Line } from "react-icons/ri";
import { LuEdit3 } from "react-icons/lu";
import { FiShare2 } from "react-icons/fi";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import ShareAlbum from "./ShareAlbum";

const AlbumIcon = ({
  data,
  setViewDelete,
  viewDelete,
  setViewEdit,
  viewEdit,
  viewMode,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [shareMode, setShareMode] = useState({ view: false, data: "" });
  const router = useRouter();
  const pathname = usePathname();
  const handleClick = () => {
    router.push(`${pathname}/${data._id}`);
  };

  return (
    <>
      <div>
        {shareMode.view && (
          <ShareAlbum shareMode={shareMode} setShareMode={setShareMode} />
        )}
      </div>
      <div className="mt-5 static prompt_card transition-all hover:border-4 flex flex-col items-center">
        {!viewMode && (
          <div className="absolute top-3 right-3">
            {editMode ? (
              <div>
                <button
                  className="hover:scale-105   hover:bg-green-200 transition-all glassmorphism_2 "
                  onClick={() =>
                    setViewEdit({ ...viewEdit, view: true, data: data })
                  }>
                  <LuEdit3 />
                </button>
                <button
                  className="hover:scale-105 hover:bg-red-200 transition-all glassmorphism_2 ml-2"
                  onClick={() =>
                    setViewDelete({ ...viewDelete, view: true, data: data })
                  }>
                  <RiDeleteBin4Line />
                </button>
                <button
                  className="hover:scale-105  hover:bg-blue-200 transition-all glassmorphism_2 ml-2"
                  onClick={() =>
                    setShareMode({ ...shareMode, view: true, data: data })
                  }>
                  <FiShare2 />
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="hover:scale-105 hover:bg-blue-200 transition-all glassmorphism_wp p-1"
                  onClick={() => setEditMode(!editMode)}>
                  <PiDotsThreeOutlineVerticalFill />
                </button>
              </div>
            )}
          </div>
        )}

        <Image
          onClick={handleClick}
          className="rounded"
          width={400}
          height={400}
          src={data?.coverImage}
          alt="album_cover"
        />
        <div className="items-start w-11/12 overflow-hidden">
          <div className="flex justify-center font-chewy f text-center">
            {data?.albumname}
          </div>
          <p className="text-gray-700 text-center text-base max-w-fit">
            {data?.desc}
          </p>
        </div>
      </div>
    </>
  );
};

const ProfileFeed = ({
  albums,
  viewDelete,
  setViewDelete,
  setViewEdit,
  viewEdit,
  viewMode,
}) => {
  return (
    <div className="w-2/3 mt-5">
      {viewMode ? (
        <h1 className="text-2xl text-center font-semibold pink_gradient font-satoshi">
          Shared Album Collection
        </h1>
      ) : (
        <h1 className="text-2xl text-center font-semibold pink_gradient font-satoshi">
          My Album Collection
        </h1>
      )}

      <div className="prompt_layout">
        {albums ? (
          albums.map((album) => (
            <AlbumIcon
              data={album}
              setViewDelete={setViewDelete}
              viewDelete={viewDelete}
              setViewEdit={setViewEdit}
              viewEdit={viewEdit}
              viewMode={viewMode}
            />
          ))
        ) : (
          <h1>No albums to display</h1>
        )}
      </div>
    </div>
  );
};

export default ProfileFeed;
