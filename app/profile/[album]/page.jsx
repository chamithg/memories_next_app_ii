"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import CreatePost from "@/components/CreatePost";
import DisplayPosts from "@/components/DisplayPosts";

const Album = () => {
  const [viewCreate, setViewCreate] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    console.log(`/api${pathname}`);
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api${pathname}`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
    console.log(posts);
  }, []);
  return (
    <div className="w-10/12 mt-10 flex flex-col items-center">
      {posts && posts.map((post) => <DisplayPosts post={post} />)}
      {viewCreate ? (
        <CreatePost
          pathname={pathname}
          setLoading={setLoading}
          setViewCreate={setViewCreate}
        />
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
