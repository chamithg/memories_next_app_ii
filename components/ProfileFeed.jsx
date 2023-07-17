"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RiDeleteBin4Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { LuEdit3 } from "react-icons/lu";

const DeleteConfirm = ({ data, router, setDeleteConf }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/profile/${data._id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("say no");
      console.error(error);
    } finally {
      setDeleteConf(false);
    }
  };

  return (
    <div className="absolute glassmorphism m-5">
      <h1 className="font-semibold text-center">
        Album {data.albumname} will be deleted permanantly
      </h1>
      <div className="flex justify-center space-x-4 mt-2">
        <button className="grad_btn_grn" onClick={() => setDeleteConf(false)}>
          Cancel
        </button>
        <button className="grad_btn_red" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

const AlbumIcon = ({ data }) => {
  const [editMode, setEditMode] = useState(false);
  const [deleteConf, setDeleteConf] = useState(false);
  const router = useRouter();
  const handleClick = () => {
    router.push(`/profile/${data._id}`);
  };

  return (
    <div className="static prompt_card transition-all hover:scale-105 flex flex-col items-center">
      {deleteConf ? (
        <DeleteConfirm
          data={data}
          router={router}
          setDeleteConf={setDeleteConf}
        />
      ) : (
        <div className="absolute top-3 right-3">
          {editMode ? (
            <div>
              <button className="hover:scale-105   hover:bg-green-200 transition-all glassmorphism_2">
                <LuEdit3 />
              </button>
              <button
                className="hover:scale-105 hover:bg-red-200 transition-all glassmorphism_2 ml-2"
                onClick={() => setDeleteConf(true)}>
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
      )}

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

const ProfileFeed = ({ albums, editMode }) => {
  return (
    <div className="w-2/3 mt-10">
      <h1 className="text-2xl mt-15 mb-15 font-semibold pink_gradient font-satoshi">
        Album Collection
      </h1>
      <div className="prompt_layout">
        {albums.map((album) => (
          <AlbumIcon data={album} />
        ))}
      </div>
    </div>
  );
};

export default ProfileFeed;
