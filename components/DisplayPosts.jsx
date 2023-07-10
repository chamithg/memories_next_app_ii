"use client";

import React, { useState } from "react";
import CreateImage from "./CreateImage";

const DisplayPosts = ({ post }) => {
  const [uploadView, setUploadView] = useState(false);
  return (
    <div className="w-full mt-10">
      <h1 className="orange_gradient text-left font-chewy text-4xl mt-2">
        {post.postname}
      </h1>
      <div className=" mt-2 h-1 w-full bg-gradient-to-r from-pink-800 via-pink-200 to-pink-400 "></div>
      <p className="mt-2 text-left font-satoshi font-semibold text-lg text-gray-700">
        {post.desc}
      </p>
      <div>
        {uploadView ? (
          <CreateImage />
        ) : (
          <button
            className="h-7 w-7 hover:scale-105 rounded-full bg-gradient-to-r from-pink-800 text-white to-pink-400"
            onClick={() => setUploadView(true)}>
            {" "}
            +{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default DisplayPosts;
