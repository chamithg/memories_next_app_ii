"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import CreatePost from "@/components/CreatePost";
import DisplayPosts from "@/components/DisplayPosts";
import Loading from "@/components/Loading";
import DeleteItem from "@/components/DeleteItem";

const Album = () => {
  const [viewCreate, setViewCreate] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewDelete, setViewDelete] = useState({ view: false, data: "" });
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
  }, [viewCreate, viewDelete]);
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
      {viewDelete.view && (
        <DeleteItem
          viewDelete={viewDelete}
          setViewDelete={setViewDelete}
          path={`/api${pathname}/${viewDelete.data._id}`}
          type={"Post"}
          name={viewDelete.data.postname}
        />
      )}
      {posts &&
        posts.map((post) => (
          <DisplayPosts
            key={post._id}
            pathname={pathname}
            post={post}
            setViewDelete={setViewDelete}
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
