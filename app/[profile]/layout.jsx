"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useEffect } from "react";

function ProfileLayout({ children }) {
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (!session) router.push("/");
  // }, [session, router]);

  return (
    <>
      <div className="flex justify-between w-full">
        <div className="w-auto">
          <img src="/assets/images/memories.png" className="h-32 w-fit" />
        </div>

        <div className="flex flex-row items-center gap-2">
          <button className="grad_btn_pink" onClick={() => router.back()}>
            <MdOutlineArrowBackIos />
          </button>

          <h1 className=" text-3xl font-chewy blue_gradient capitalize">
            {" Hi " + session?.user.name.split(" ")[0] + "!"}
          </h1>
          <Image
            src={session?.user.image}
            alt="profile"
            className="rounded-full"
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
