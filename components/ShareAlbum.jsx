"useClient";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { MdOutlineClear } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { data } from "autoprefixer";

const ShareAlbum = ({ shareMode, setShareMode }) => {
  const { data: session } = useSession();
  const [searchVal, setSearchVal] = useState("");
  const [users, setUsers] = useState([]);
  const [foundUsers, setFoundUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/profile/search");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  // clear state

  const clearSearch = (e) => {
    e.preventDefault();
    setSearchVal("");
  };

  // filter the users

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchVal(e.target.value);
    const excludeOwn = users.filter((user) => user._id !== session?.user._id);
    const filtered = excludeOwn.filter((user) =>
      user.username.includes(searchVal)
    );
    setFoundUsers(filtered);
  };

  // share with found user
  const handleShare = async (_id) => {
    try {
      const response = await fetch("/api/profile/search", {
        method: "PATCH",
        body: JSON.stringify({
          userId: _id,
          albumId: shareMode.data._id,
        }),
      });
      if (response.ok) {
        setSearchVal("");
        alert("album has been shared");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShareMode({
        view: false,
        data: "",
      });
    }
  };

  return (
    <div className="transition ease-in-out delay-150 fixed z-50 top-0 left-0 h-screen w-screen backdrop-blur-2xl">
      <form
        className="glassmorphism fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-md w-96"
        onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-between items-center justify-center mb-10">
          <h1 className="text-2xl font-semibold pink_gradient font-satoshi ">
            Share Album{" "}
            <span className="blue_gradient">{shareMode.data.albumname}</span>
          </h1>
          <button
            className="hover:bg-red-400 h-6 w-6 p-1 rounded-full transition-all"
            onClick={() => setShareMode({ view: false, data: "" })}>
            <MdOutlineClear />
          </button>
        </div>

        <input
          type="text"
          className="search_input gap-2"
          onChange={(e) => handleSearch(e)}
          value={searchVal}
        />

        {foundUsers && searchVal && (
          <div className=" transition-all">
            {foundUsers.map((foundUser) => (
              <div
                onClick={() => handleShare(foundUser._id)}
                className=" transition-all dropdown_link p-3 hover:bg-orange-400 m-2 rounded-lg">
                <h1>{foundUser.username.split(" ")[0]}</h1>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-center gap-2 mt-2">
          <button className="outline_btn" onClick={(e) => clearSearch(e)}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShareAlbum;
