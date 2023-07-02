"use client";
import React from "react";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session?.user) {
    router.push("/");
  }
  return (
    <section className="flex mt-20">
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
    </section>
  );
};

export default ProfilePage;
