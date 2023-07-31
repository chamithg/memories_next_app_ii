"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { MdOutlineClear } from "react-icons/md";

const AddComment = ({ viewComment, setViewComment, user }) => {
  const [comment, setComment] = useState("");

  const clearField = (e) => {
    e.preventDefault();
    setComment("");
  };
  console.log(viewComment.data._id);
  console.log(comment);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/profile/album/post/${viewComment.data._id}/comment`,
        {
          method: "PATCH",
          body: JSON.stringify({
            commenter: user.name,
            image: user.image,
            contex: comment,
          }),
        }
      );
      if (response.ok) {
        comment("false");
        alert("comment has been added");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setViewComment({
        view: false,
        data: "",
      });
    }
  };

  return (
    <div className="transition ease-in-out delay-150 fixed z-50 top-0 left-0 h-screen w-screen backdrop-blur-2xl">
      <form
        className="glassmorphism fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-md w-96 max-h-full"
        onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-between items-center justify-center mb-5">
          <h1 className="text-lg font-semibold pink_gradient font-satoshi ">
            Comments of{" "}
            <span className="blue_gradient text-lg">
              {viewComment.data.caption}
            </span>
          </h1>

          <button
            className="hover:bg-red-400 h-6 w-6 p-1 rounded-full transition-all"
            onClick={() =>
              setViewComment({ ...viewComment, data: "", view: false })
            }>
            <MdOutlineClear />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <Image
            className="rounded"
            width={200}
            height={200}
            src={viewComment.data.image}
            alt="uploaded_images"
          />
        </div>
        <div className="max-h-60 overflow-y-scroll scrollbar-hide m-2">
          {viewComment.data.comments.map((comment) => (
            <div className="p-2 bg-gray-300 m-2 h-fit rounded-md shadow-lg w-auto">
              <div className="flex items-center ">
                <Image
                  src={`${comment.split(":>")[0]}`}
                  alt="profile"
                  className="rounded-full"
                  width={45}
                  height={45}
                />
                <div className="">
                  <h1 className="ml-2 blue_gradient font-satoshi font-semibold capitalize text-lg">
                    {comment.split(":>")[1] + ":"}
                  </h1>
                  <p className="ml-5 font-mono break-words  text-base w-60">
                    {comment.split(":>")[2]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <textarea
          type="text"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          className="form_textarea gap-2"
        />
        <div className="flex items-center justify-center gap-2 mt-2">
          <button className="outline_btn" onClick={(e) => clearField(e)}>
            Clear
          </button>
          <button className="grad_btn" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
