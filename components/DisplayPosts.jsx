import React from "react";

const DisplayPosts = ({ post }) => {
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
        <button className="h-7 w-7 hover:scale-105 rounded-full bg-gradient-to-r from-pink-800 text-white to-pink-400">
          {" "}
          +{" "}
        </button>
      </div>
    </div>
  );
};

export default DisplayPosts;
