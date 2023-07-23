import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import FileBase from "react-file-base64";
import Image from "next/image";

const EditImage = ({ viewEdit, setViewEdit }) => {
  const [uploadImage, setUploadImage] = useState({
    image: viewEdit.data.image,
    caption: viewEdit.data.caption,
  });
  const [showValidations, setShowValidation] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploadImage.image && uploadImage.caption) {
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
    } else {
      setShowValidation(true);
    }
  };
  return (
    <div className="transition-opacity fixed z-40 top-0 left-0 h-screen w-screen backdrop-blur-2xl ">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="glassmorphism fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 shadow-md w-screen-2/5 ">
        <h1 className="text-2xl font-semibold pink_gradient font-satoshi mb-10">
          Edit Image
        </h1>
        <div className="flex items-center">
          <div className="relative w-40 h-56 border-gray-500 border-2 flex items-center justify-center">
            <div>
              <div className="absolute  top-0 left-2 w-32 h-32 flex flex-col gap-2">
                <AiOutlineCloudUpload className="z-50 w-7 h-7" />
                <Image
                  src={uploadImage.image.base64 || viewEdit.data.image}
                  className="m-5"
                  width={100}
                  height={100}
                  alt="upload_image"
                />
              </div>
              <div className="absolute  bottom-0 left-6 input_file w-24 h-10 overflow-hidden">
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={(base64) =>
                    setUploadImage({ ...uploadImage, image: base64 })
                  }></FileBase>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="block text-gray-700 ml-3 text-sm font-bold">
              Caption
            </label>
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
              value={uploadImage.caption}
              onChange={(e) =>
                setUploadImage({ ...uploadImage, caption: e.target.value })
              }
            />
            <button className="grad_btn_pink gap-4 m-3 w-24" type="submit">
              {" "}
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditImage;
