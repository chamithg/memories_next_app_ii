"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MdOutlineClear } from "react-icons/md";

import FileBase from "react-file-base64";
import { useRouter } from "next/navigation";

const EditAlbum = ({ viewEdit, setViewEdit }) => {
  const [albumData, setAlbumData] = useState({
    albumname: viewEdit.data.albumname,
    desc: viewEdit.data.desc,
    coverImage: viewEdit.data.coverImage,
  });
  console.log(albumData);

  const [showValidations, setShowValidation] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    console.log(albumData);
    e.preventDefault();
    if (albumData.albumname && albumData.coverImage && albumData.desc) {
      try {
        const response = await fetch(`/api/profile/${viewEdit.data._id}`, {
          method: "PATCH",
          body: JSON.stringify({
            albumname: albumData.albumname,
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
        setViewEdit(false);
        // router.push("/profile");
      }
    } else {
      setShowValidation(true);
    }
  };

  return (
    <div className="transition-opacity fixed z-50 top-0 left-0 h-screen w-screen backdrop-blur-2xl ">
      <form
        className="glassmorphism fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-md w-screen-2/5 "
        onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-between items-center justify-center mb-10">
          <h1 className="text-2xl font-semibold pink_gradient font-satoshi">
            Edit Album
          </h1>
          <button
            className="hover:bg-red-400 h-6 w-6 p-1 rounded-full transition-all"
            onClick={() => setViewEdit({ view: false, data: "" })}>
            <MdOutlineClear />
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Album Name
          </label>
          {showValidations && !albumData.albumname && (
            <h1 className=" text-red-600 font-semibold font-satoshi">
              Please add a Album Name
            </h1>
          )}
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
          {showValidations && !albumData.desc && (
            <h1 className=" text-red-600 font-semibold font-satoshi">
              Please add a description
            </h1>
          )}

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
          {showValidations && !albumData.coverImage && (
            <h1 className=" text-red-600 font-semibold font-satoshi">
              Please select a cover image
            </h1>
          )}
          <FileBase
            type="file"
            multiple={false}
            onDone={(base64) =>
              setAlbumData({ ...albumData, coverImage: base64.base64 })
            }
          />
        </div>

        <Image
          src={albumData?.coverImage}
          className="m-5"
          width={100}
          height={100}
          alt="Image"
        />

        <div className="flex items-center justify-between">
          <button className="grad_btn" type="submit">
            Update Album
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAlbum;
