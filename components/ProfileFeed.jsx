import React from "react";
import AlbumIcon from "./AlbumIcon";

const ProfileFeed = ({ albums }) => {
  console.log(albums);
  return (
    <div className="glassmorphism w-2/3 mt-10">
      <h1 className="text-2xl mt-15 font-semibold pink_gradient font-satoshi">
        Album Collection
      </h1>
      <div className="flex flex-wrap justifi-center gap-4">
        {albums &&
          albums.map((album) => {
            <AlbumIcon album={album} />;
          })}
      </div>
    </div>
  );
};

export default ProfileFeed;
