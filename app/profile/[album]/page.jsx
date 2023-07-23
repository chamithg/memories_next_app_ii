"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import CreatePost from "@/components/CreatePost";
import DisplayPosts from "@/components/DisplayPosts";
import Loading from "@/components/Loading";
import DeleteItem from "@/components/DeleteItem";
import EditPost from "@/components/EditPost";

const Album = () => {
  const [viewCreate, setViewCreate] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  //  for deleting a post
  const [viewDelete, setViewDelete] = useState({ view: false, data: "" });
  // for editing a post
  const [viewEdit, setViewEdit] = useState({ view: false, data: "" });
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api${pathname}`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [viewCreate, viewDelete, viewEdit]);
  return (
    <div className="w-10/12 mt-10 flex flex-col items-center">
      {loading && (
        <div className="flex gap-2 justify-center items-center">
          <Loading />
          <h1 className="orange_gradient font-semibold">
            Loading Collections ...
          </h1>
        </div>
      )}
      {/* this is for a post/collection delete */}
      {viewDelete.view && (
        <DeleteItem
          viewDelete={viewDelete}
          setViewDelete={setViewDelete}
          path={`/api${pathname}/${viewDelete.data._id}`}
          type={"Post"}
          name={viewDelete.data.postname}
        />
      )}
      {/* this is for post/collection edit */}
      {viewEdit.view && (
        <EditPost viewEdit={viewEdit} setViewEdit={setViewEdit} />
      )}
      {posts &&
        posts.map((post) => (
          <DisplayPosts
            key={post._id}
            pathname={pathname}
            post={post}
            setViewDelete={setViewDelete}
            viewEdit={viewEdit}
            setViewEdit={setViewEdit}
          />
        ))}
      {viewCreate ? (
        <CreatePost pathname={pathname} setViewCreate={setViewCreate} />
      ) : (
        <button className="grad_btn" onClick={() => setViewCreate(true)}>
          {" "}
          + Add New Collection
        </button>
      )}
    </div>
  );
};

export default Album;
