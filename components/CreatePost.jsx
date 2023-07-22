"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const CreatePost = ({ pathname, setViewCreate }) => {
  const albumId = pathname.split("/")[2];
  const { data: session } = useSession();
  const [post, setPost] = useState({
    postname: "",
    desc: "",
  });
  const [showValidations, setShowValidation] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (post.desc && post.postname) {
      try {
        const response = await fetch("/api/profile/album/newPost", {
          method: "POST",
          body: JSON.stringify({
            album: albumId,
            postname: post.postname,
            desc: post.desc,
          }),
        });
        if (response.ok) {
          setPost({
            postname: "",
            desc: "",
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setViewCreate(false);
      }
    } else {
      setShowValidation(true);
    }
  };

  return (
    <div className="transition-opacity fixed z-50 top-0 left-0 h-screen w-screen backdrop-blur-2xl">
      <form
        className="glassmorphism fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-md w-96"
        onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-2xl font-semibold pink_gradient font-satoshi mb-10">
          Create Collection
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Collection Name
          </label>
          {showValidations && !post.postname && (
            <h1 className=" text-red-600 font-semibold font-satoshi">
              Please add a Collection Name
            </h1>
          )}
          <input
            className="form_input"
            id="postname"
            type="text"
            value={post.postname}
            onChange={(e) => setPost({ ...post, postname: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          {showValidations && !post.desc && (
            <h1 className=" text-red-600 font-semibold font-satoshi">
              Please add a Description
            </h1>
          )}

          <textarea
            className="form_textarea"
            value={post.desc}
            onChange={(e) => setPost({ ...post, desc: e.target.value })}
          />
          <p className="text-red-500 text-xs italic"></p>
        </div>
        <div className="flex items-center justify-between">
          <button className="grad_btn" type="submit">
            Create Collection
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
