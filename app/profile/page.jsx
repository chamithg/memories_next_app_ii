"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import CreateAlbum from "@/components/CreateAlbum";
import ProfileFeed from "@/components/ProfileFeed";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import DeleteAlbum from "@/components/DeleteItem";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewCreate, setViewCreate] = useState(false);
  const [viewDelete, setViewDelete] = useState({ data: "", view: false });

  const router = useRouter();
  useEffect(() => {
    const fetchAlbum = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/${session?.user.id}`);
        const data = await response.json();
        setAlbums(data);
        setLoading(false);
      } catch (error) {}
    };
    if (session?.user.id) {
      fetchAlbum();
    }
  }, [session?.user.id, viewCreate, viewDelete]);

  return (
    <section className="flex mt-20 flex-col w-screen items-center">
      <div className="flex flex-row ">
        <Image
          src={session?.user.image}
          alt="profile"
          className="rounded-full m-2"
          width={100}
          height={100}
        />
        <div>
          <h1 className=" head_text font-chewy blue_gradient capitalize">
            {session?.user.name}
          </h1>
          <p>{session?.user.email}</p>
        </div>
      </div>

      <ProfileFeed
        albums={albums}
        viewDelete={viewDelete}
        setViewDelete={setViewDelete}
      />
      {loading && (
        <div className="flex gap-2 justify-center items-center">
          <Loading />
          <h1 className="orange_gradient font-semibold">Loading Albums ...</h1>
        </div>
      )}
      {viewDelete.view && (
        <DeleteAlbum
          viewDelete={viewDelete}
          setViewDelete={setViewDelete}
          type="Album"
          path={`api/profile/${viewDelete.data._id}`}
          name={viewDelete.data.albumname}
        />
      )}

      {viewCreate ? (
        <CreateAlbum userId={session?.user.id} setViewCreate={setViewCreate} />
      ) : (
        <button
          className="grad_btn mt-5 font-semibold"
          onClick={() => setViewCreate(true)}>
          {" "}
          Add New Album
        </button>
      )}
    </section>
  );
};

export default ProfilePage;
