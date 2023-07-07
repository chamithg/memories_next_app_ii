import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AlbumIcon = ({ data }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/profile/${data._id}`);
  };
  return (
    <div
      className="prompt_card transition-all hover:scale-105 flex flex-col items-center"
      onClick={handleClick}>
      <Image
        className="rounded"
        width={300}
        height={300}
        src={data.coverImage}
        alt="album_cover"
      />
      <div className="items-start w-11/12 overflow-hidden">
        <div className="font-chewy font-bold text-xl mb-2 text-center">
          {data.albumname}
        </div>
        <p className="text-gray-700 justify-start text-base max-w-fit ">
          {data.desc}
        </p>
      </div>
    </div>
  );
};

const ProfileFeed = ({ albums }) => {
  console.log(albums);
  return (
    <div className="w-2/3 mt-10">
      <h1 className="text-2xl mt-15 mb-15 font-semibold pink_gradient font-satoshi">
        Album Collection
      </h1>
      <div className="prompt_layout">
        {albums.map((album) => (
          <AlbumIcon data={album} />
        ))}
      </div>
    </div>
  );
};

export default ProfileFeed;
