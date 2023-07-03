"use client";
import React, { useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CreateAlbum from "@/components/CreateAlbum";
import ProfileFeed from "@/components/ProfileFeed";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    const fetchAlbum = async () => {
      alert("hello");
    };
    if (session?.user.id) {
      fetchAlbum();
    } else {
      // router.push("/");
    }
  }, []);

  return (
    <section className="flex mt-20 flex-col w-100">
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
      <ProfileFeed />
      <CreateAlbum userId={session?.user.id} />
    </section>
  );
};

export default ProfilePage;
