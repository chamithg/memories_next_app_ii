import React from "react";
import Image from "next/image";

const AlbumIcon = ({ album }) => {
  console.log(album);
  return (
    <div className="prompt_card transition-all hover:scale-105 flex flex-col items-center">
      <Image
        className="rounded"
        width={200}
        height={200}
        src={album.coverImage}
        alt="album_cover"
      />
      <div className="px-6 py-4">
        <div className=" font-chewy font-bold text-xl mb-2">
          The Coldest Sunset
        </div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
    </div>
  );
};

export default AlbumIcon;
