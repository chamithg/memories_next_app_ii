"use client";
import React, { useEffect, useState } from "react";

import Image from "next/image";

const ImageThumb = ({ image }) => {
  return (
    <div>
      <div className=" shadow-md transition-all hover:scale-105 flex flex-col items-center">
        <Image
          className="rounded"
          width={300}
          height={300}
          src={image.image}
          alt="uploaded_images"
        />
      </div>
    </div>
  );
};

const PictureFeed = ({ images }) => {
  return (
    <div>
      <div className="prompt_layout">
        {images.map((image) => (
          <ImageThumb key={image._id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default PictureFeed;
