"useClient";
import { useState } from "react";
import Image from "next/image";
import { MdOutlineClear } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";

const ShareAlbum = ({ shareMode, setShareMode }) => {
  const [searchVal, setSearchVal] = useState("");
  const handleSearch = async () => {};
  const handleShare = async () => {
    try {
      const respsponse = await fetch(
        `/api/profile/album/post/${viewEdit.data._id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            caption: uploadImage.caption,
            image: uploadImage.image,
          }),
        }
      );
      if (respsponse.ok) {
        setUploadImage({
          image: "",
          caption: "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setViewEdit(false);
    }
  };

  return (
    <div className="absolute z-50 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <form className="flex flex-col gap-2 space-x-4 glassmorphism_wp p-2">
        <input
          placeholder="Search Receiver .."
          type="text"
          className="search_input rounded-full shadow-lg shadow-indigo-500/40"
        />
        <div className="flex justify-center items-center gap-3">
          <button
            className="rounded-full border border-gray-200 bg-white/75 h-fit w-fit hover:scale-105 p-2"
            onClick={() => setShareMode({ data: "", view: false })}>
            <MdOutlineClear />
          </button>
          <button
            className="rounded-full border border-gray-200 bg-white/75 h-fit w-fit hover:scale-105 p-2"
            onClick={() => handleDelete()}>
            <AiOutlineSearch />
          </button>
        </div>
      </form>

      <div className="flex justify-center space-x-4 mt-2"></div>
    </div>
  );
};

export default ShareAlbum;
