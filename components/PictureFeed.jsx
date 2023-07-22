"use client";
import React, { useEffect, useState } from "react";
import { RiDeleteBin4Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { LuEdit3 } from "react-icons/lu";

import Image from "next/image";

const ImageThumb = ({ image, setViewDelete }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div>
      <div className="relative shadow-md transition-all hover:scale-105 flex flex-col items-center">
        <div className="absolute top-3 right-3">
          {editMode ? (
            <div>
              <button className="hover:scale-105  hover:bg-green-200 transition-all glassmorphism_4">
                <LuEdit3 />
              </button>
              <button
                className="hover:scale-105 hover:bg-red-200 transition-all glassmorphism_4 ml-2"
                onClick={() => setViewDelete({ view: true, data: image })}>
                <RiDeleteBin4Line />
              </button>
            </div>
          ) : (
            <button
              className="hover:scale-105  hover:bg-blue-200 transition-all glassmorphism_4"
              onClick={() => setEditMode(!editMode)}>
              <FaRegEdit />
            </button>
          )}
        </div>

        <Image
          className="rounded"
          width={300}
          height={300}
          src={image.image}
          alt="uploaded_images"
        />
      </div>
    </div>
  );
};

const PictureFeed = ({ images, setViewDelete }) => {
  return (
    <div>
      <div className="prompt_layout">
        {images.map((image) => (
          <ImageThumb
            key={image._id}
            image={image}
            setViewDelete={setViewDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default PictureFeed;
