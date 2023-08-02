"use client";
import React, { useEffect, useState } from "react";
import { RiDeleteBin4Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { LuEdit3 } from "react-icons/lu";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdOutlineInsertComment } from "react-icons/md";
import { useSession } from "next-auth/react";

import Image from "next/image";

const ImageThumb = ({
  image,
  setViewDelete,
  viewEdit,
  setViewEdit,
  viewMode,
  viewComment,
  setViewComment,
  likeImage,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [commentMode, setCommentMode] = useState(false);
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      <div className="relative shadow-xl transition-all delay-700 w-full h-auto overflow-hidden rounded-lg  flex flex-col items-center">
        <div className="z-50 absolute bottom-3 text-gray-600 left-3 flex flex-col gap-2 backdrop-blur-lg p-2 rounded-xl">
          <div
            className="flex items-center gap-2"
            onClick={() => likeImage(image._id)}>
            {image.likes.includes(session.user.id) ? (
              <AiFillHeart className="w-8 h-8 text-red-600" />
            ) : (
              <AiOutlineHeart className="w-8 h-8" />
            )}
            <h1>{image.likes.length}</h1>
          </div>
        </div>
        <div className="z-50 absolute bottom-3 text-gray-600 right-3 flex flex-col gap-2 backdrop-blur-lg p-2 rounded-xl">
          <div
            className="flex items-center gap-2"
            onClick={() => setViewComment({ view: true, data: image })}>
            <MdOutlineInsertComment className="w-8 h-8" />{" "}
            <h1>{image.comments.length}</h1>
          </div>
        </div>

        <div className="z-50 absolute top-3 right-3">
          {editMode ? (
            <div>
              <button
                className="hover:scale-105  hover:bg-green-200 transition-all glassmorphism_4"
                onClick={() => setViewEdit({ view: true, data: image })}>
                <LuEdit3 />
              </button>
              <button
                className="hover:scale-105 hover:bg-red-200 transition-all glassmorphism_4 ml-2"
                onClick={() => setViewDelete({ view: true, data: image })}>
                <RiDeleteBin4Line />
              </button>
            </div>
          ) : (
            <div className="z-100">
              {!viewMode && (
                <button
                  className="z-100 hover:scale-105  hover:bg-blue-200 transition-all glassmorphism_4"
                  onClick={() => setEditMode(!editMode)}>
                  <FaRegEdit />
                </button>
              )}
            </div>
          )}
        </div>

        <Image
          className="rounded transition-all w-full duration-700 hover:scale-105"
          width={300}
          height={300}
          src={image.image}
          alt="uploaded_images"
        />
      </div>
    </div>
  );
};

const PictureFeed = ({
  images,
  setViewDelete,
  viewEdit,
  setViewEdit,
  viewMode,
  viewComment,
  setViewComment,
  likeImage,
}) => {
  return (
    <div>
      <div className="prompt_layout">
        {images.map((image) => (
          <ImageThumb
            key={image._id}
            image={image}
            setViewDelete={setViewDelete}
            viewEdit={viewEdit}
            setViewEdit={setViewEdit}
            viewMode={viewMode}
            viewComment={viewComment}
            setViewComment={setViewComment}
            likeImage={likeImage}
          />
        ))}
      </div>
    </div>
  );
};

export default PictureFeed;
