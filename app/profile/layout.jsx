"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ProfileLayout({ children }) {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session?.user) {
    router.push("/");
  }

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="w-auto">
          <img src="/assets/images/memories.png" className="h-32 w-fit" />
        </div>

        <div className="flex flex-row items-center gap-2">
          <h1 className=" text-3xl font-chewy blue_gradient capitalize">
            {" Hi " + session?.user.name.split(" ")[0] + "!"}
          </h1>
          <Image
            src={session?.user.image}
            alt="profile"
            className="rounded-full m-2"
            width={50}
            height={50}
          />
          <button
            type="button"
            onClick={() => {
              signOut;
              router.push("/");
            }}
            className="outline_btn">
            Sign Out
          </button>
          <div>{/* <p>{session?.user.email}</p> */}</div>
        </div>
      </div>
      {children}
    </>
  );
}
export default ProfileLayout;
