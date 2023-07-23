"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RiDeleteBin4Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { LuEdit3 } from "react-icons/lu";

const AlbumIcon = ({
  data,
  setViewDelete,
  viewDelete,
  setViewEdit,
  viewEdit,
}) => {
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    router.push(`/profile/${data._id}`);
  };

  return (
    <div className="static prompt_card transition-all hover:scale-105 flex flex-col items-center">
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
          </div>
        ) : (
          <button
            className="hover:scale-105  hover:bg-blue-200 transition-all glassmorphism_2"
            onClick={() => setEditMode(!editMode)}>
            <FaRegEdit />
          </button>
        )}
      </div>

      <Image
        onClick={handleClick}
        className="rounded"
        width={400}
        height={400}
        src={data.coverImage}
        alt="album_cover"
      />
      <div className="items-start w-11/12 overflow-hidden">
        <div className="flex justify-center font-chewy f text-center">
          {data.albumname}
        </div>
        <p className="text-gray-700 text-center text-base max-w-fit">
          {data.desc}
        </p>
      </div>
    </div>
  );
};

const ProfileFeed = ({
  albums,
  viewDelete,
  setViewDelete,
  setViewEdit,
  viewEdit,
}) => {
  return (
    <div className="w-2/3 mt-10">
      <h1 className="text-2xl mt-15 mb-15 font-semibold pink_gradient font-satoshi">
        Album Collection
      </h1>
      <div className="prompt_layout">
        {albums.map((album) => (
          <AlbumIcon
            data={album}
            setViewDelete={setViewDelete}
            viewDelete={viewDelete}
            setViewEdit={setViewEdit}
            viewEdit={viewEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileFeed;
