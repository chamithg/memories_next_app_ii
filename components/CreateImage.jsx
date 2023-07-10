import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import FileBase from "react-file-base64";

const CreateImage = () => {
  const [image, setImage] = useState({
    image: "",
    caption: "",
  });
  const handleSubmit = () => {};
  return (
    <div>
      <div className="w-40 h-40 border-gray-500 border-2 flex items-center justify-center">
        <div className="w-32 h-32 border-gray-500 border-2 border-dashed flex flex-col items-center justify-center">
          <AiOutlineCloudUpload className="w-7 h-7" />
          <div className="input_file w-24 h-10 overflow-hidden">
            <FileBase
              type="file"
              multiple={false}
              onDone={(base64) =>
                setAlbumData({ ...albumData, coverImage: base64 })
              }></FileBase>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default CreateImage;
