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
import EditAlbum from "@/components/EditAlbum";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewCreate, setViewCreate] = useState(false);
  const [viewDelete, setViewDelete] = useState({ data: "", view: false });
  const [viewEdit, setViewEdit] = useState({ data: "", view: false });
  const [viewMode, setViewMode] = useState(false);

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
  }, [session?.user.id, viewCreate, viewDelete, viewEdit]);

  return (
    <section className="flex flex-col w-screen items-center">
      <div className="flex w-2/3  h-20 items-center justify-center gap-4">
        <button
          className={`rounded-md flex-auto ${
            viewMode ? "outline_btn_1" : "grad_btn_1"
          } h-10`}
          onClick={() => setViewMode(false)}>
          Creator Mode
        </button>

        <button
          className={`rounded-md flex-auto ${
            viewMode ? "grad_btn_1" : "outline_btn_1"
          }  h-10 text-xl`}
          onClick={() => setViewMode(true)}>
          Viewer Mode
        </button>
      </div>

      <ProfileFeed
        albums={albums}
        viewDelete={viewDelete}
        setViewDelete={setViewDelete}
        viewEdit={viewEdit}
        setViewEdit={setViewEdit}
      />
      {loading && (
        <div className="flex gap-2 justify-center items-center">
          <Loading />
          <h1 className="orange_gradient font-semibold">Loading Albums ...</h1>
        </div>
      )}
      {/* display Album delete conf message */}
      {viewDelete.view && (
        <DeleteAlbum
          viewDelete={viewDelete}
          setViewDelete={setViewDelete}
          type="Album"
          path={`api/profile/${viewDelete.data._id}`}
          name={viewDelete.data.albumname}
        />
      )}
      {/* display album edit form */}
      {viewEdit.view && (
        <EditAlbum viewEdit={viewEdit} setViewEdit={setViewEdit} />
      )}
      {/* display album create form */}
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
