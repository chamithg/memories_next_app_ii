import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import FileBase from "react-file-base64";
import Image from "next/image";

const CreateImage = ({ postID, setUploadView }) => {
  const [uploadImage, setUploadImage] = useState({
    image: "",
    caption: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respsponse = await fetch("/api/profile/album/post/newImage", {
        method: "POST",
        body: JSON.stringify({
          post: postID,
          caption: uploadImage.caption,
          image: uploadImage.image,
        }),
      });

      if (respsponse.ok) {
        setUploadImage({
          image: "",
          caption: "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUploadView(false);
    }
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex items-center">
          <div className="w-40 h-40 border-gray-500 border-2 flex items-center justify-center">
            {uploadImage.image ? (
              <Image
                src={uploadImage.image.base64}
                className="m-5"
                width={100}
                height={100}
                alt="upload_image"
              />
            ) : (
              <div className="w-32 h-32 border-gray-500 border-2 border-dashed flex flex-col items-center justify-center">
                <AiOutlineCloudUpload className="w-7 h-7" />
                <div className="input_file w-24 h-10 overflow-hidden">
                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={(base64) =>
                      setUploadImage({ ...uploadImage, image: base64 })
                    }></FileBase>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <label className="block text-gray-700 ml-3 text-sm font-bold">
              Caption
            </label>
            <input
              className="form_input h-3 gap-4 ml-3 max-w-md"
              type="text"
              onChange={(e) =>
                setUploadImage({ ...uploadImage, caption: e.target.value })
              }
            />
            <button className="grad_btn_pink gap-4 m-3 w-24" type="submit">
              {" "}
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateImage;
