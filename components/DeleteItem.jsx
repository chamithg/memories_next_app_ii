import Image from "next/image";
const DeleteItem = ({ viewDelete, setViewDelete, path, type, name }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(path, {
        method: "DELETE",
      });
    } catch (error) {
    } finally {
      setViewDelete({ data: "", view: false });
    }
  };

  return (
    <div className=" z-50  fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 glassmorphism h-fit w-fit">
      <h1 className="font-semibold text-center">
        {type} {name} will be deleted permanantly
      </h1>
      {type == "Image" && (
        <div className="flex items-center justify-center">
          <Image
            className="rounded m-3 "
            height={100}
            width={100}
            src={viewDelete.data.image}
          />
        </div>
      )}
      <div className="flex justify-center space-x-4 mt-2">
        <button
          className="grad_btn_grn"
          onClick={() => setViewDelete({ data: "", view: false })}>
          Cancel
        </button>
        <button className="grad_btn_red" onClick={() => handleDelete()}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteItem;
