"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import CreateAlbum from "@/components/CreateAlbum";
import ProfileFeed from "@/components/ProfileFeed";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [albums, setAlbums] = useState();

  const router = useRouter();
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await fetch(`/api/${session?.user.id}/album`);
        const data = await response.json();
        setAlbums(data);
      } catch (error) {}
    };
    if (session?.user.id) {
      fetchAlbum();
    }
    router.push("/");
  }, [session?.user.id]);

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
      <ProfileFeed albums={albums} />

      <CreateAlbum userId={session?.user.id} />
    </section>
  );
};

export default ProfilePage;
