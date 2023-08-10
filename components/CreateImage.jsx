import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdOutlineClear } from "react-icons/md";

import FileBase from "react-file-base64";
import Image from "next/image";

const CreateImage = ({ postID, setUploadView }) => {
  const [uploadImage, setUploadImage] = useState({
    image: "",
    caption: "",
  });
  const [showValidations, setShowValidation] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploadImage.image && uploadImage.caption) {
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
    } else {
      setShowValidation(true);
    }
  };
  return (
    <div className="mt-5">
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
              <>
                <div>
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
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <label className="block text-gray-700 ml-3 text-sm font-bold">
                Caption
              </label>
              <button
                className="hover:bg-red-400 h-6 w-6 p-1 rounded-full transition-all"
                onClick={() => setUploadView(false)}>
                <MdOutlineClear />
              </button>
            </div>

            {showValidations && !uploadImage.image && (
              <h1 className="ml-2 text-red-600 font-semibold font-satoshi">
                Please choose an image
              </h1>
            )}
            {showValidations && !uploadImage.caption && (
              <h1 className="ml-2 text-red-600 font-semibold font-satoshi">
                Please add a caption
              </h1>
            )}
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
