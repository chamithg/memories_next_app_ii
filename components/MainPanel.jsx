"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const MainPanel = () => {
  const [viewSign, setViewSign] = useState(false);
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setUpProviders();
  }, []);

  return (
    <div className="mt-10 flex flex-col items-center ">
      <button
        className="grad_btn mt-10 w-50 h-20"
        onClick={() => setViewSign(true)}>
        Create Memory
      </button>
      <div className={!viewSign && !session?.user ? "hidden" : ""}>
        {session?.user ? (
          <div className="flex  flex-col items-center gap-3 md:gap-5">
            <Image
              src={session?.user.image}
              alt="profile"
              className="rounded-full m-2"
              width={100}
              height={100}
            />
            <Link href="/profile" className="black_btn">
              {" "}
              Continue as {session?.user.name} ?
            </Link>
            or
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile"></Link>
          </div>
        ) : (
          <div>
            <button
              className="black_btn bg-black  mt-10 w-50 h-10"
              onClick={() => signIn(providers.id)}>
              Sign in
            </button>
          </div>
        )}
      </div>

      <button className="outline_btn mt-10 w-50 h-20"> View Memory</button>
    </div>
  );
};

export default MainPanel;
