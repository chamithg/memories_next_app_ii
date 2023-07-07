"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const CreatePost = ({ pathname, setLoading, setViewCreate }) => {
  const albumId = pathname.split("/")[2];
  const { data: session } = useSession();
  const [post, setPost] = useState({
    postname: "",
    desc: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        console.log("DONE");
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
  };

  return (
    <div className="mt-10 flex items-center flex-col w-1/2">
      <form
        className="glassmorphism shadow-md min-w-full"
        onSubmit={(e) => handleSubmit(e)}>
        <h1 className="text-2xl font-semibold pink_gradient font-satoshi mb-10">
          Create Collection
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Collection Name
          </label>
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
