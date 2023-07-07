"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import FileBase from "react-file-base64";
import { useRouter } from "next/navigation";

const CreateAlbum = ({ userId, setViewCreate }) => {
  const [albumData, setAlbumData] = useState({
    albumname: "",
    desc: "",
    coverImage: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/profile/newAlbum", {
        method: "POST",
        body: JSON.stringify({
          albumname: albumData.albumname,
          userId: userId,
          coverImage: albumData.coverImage,
          desc: albumData.desc,
        }),
      });
      if (response.ok) {
        setAlbumData({
          albumname: "",
          desc: "",
          coverImage: "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setViewCreate(false);
      router.push("/profile");
    }
  };

  return (
    <div className="mt-10 flex items-center flex-col">
      <form
        className="glassmorphism shadow-md min-w-full"
        onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-2xl font-semibold pink_gradient font-satoshi mb-10">
          Create Album
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Album Name
          </label>
          <input
            className="form_input"
            id="albumname"
            type="text"
            value={albumData.albumname}
            onChange={(e) =>
              setAlbumData({ ...albumData, albumname: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            className="form_textarea"
            value={albumData.desc}
            onChange={(e) =>
              setAlbumData({ ...albumData, desc: e.target.value })
            }
          />
          <p className="text-red-500 text-xs italic"></p>
        </div>
        <div className="m-5">
          <FileBase
            type="file"
            multiple={false}
            onDone={(base64) =>
              setAlbumData({ ...albumData, coverImage: base64 })
            }
          />
        </div>
        {albumData.coverImage ? (
          <Image
            src={albumData.coverImage.base64}
            className="m-5"
            width={100}
            height={100}
          />
        ) : (
          ""
        )}

        <div className="flex items-center justify-between">
          <button className="grad_btn" type="submit">
            Create Album
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAlbum;
