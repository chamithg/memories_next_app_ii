"use client";

import React, { useEffect, useState } from "react";
import CreateImage from "./CreateImage";
import PictureFeed from "./PictureFeed";
import Loading from "./Loading";

const DisplayPosts = ({ post, pathname }) => {
  const [uploadView, setUploadView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [collectionImages, setCollectionImages] = useState([]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api${pathname}/${post._id}/fetchImages`);
      const data = await response.json();
      setCollectionImages(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    fetchImages();
  }, [uploadView]);

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
        {loading ? <Loading /> : <PictureFeed images={collectionImages} />}
        {uploadView ? (
          <CreateImage setUploadView={setUploadView} postID={post._id} />
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
