"use client";
import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ImageCarousel = ({ images }) => {
  return (
    <Carousel>
      {images.map((image) => (
        <div>
          <Image
            src={image.image}
            width={300}
            height={300}
            alt="uploaded_images"
          />
          <p className="legend">{image.caption}</p>
        </div>
      ))}
    </Carousel>
  );
};

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
  const [slideShow, setSlideShow] = useState(true);
  return (
    <div>
      {slideShow && (
        // <div className="slide_show glassmorphism  absolute top-0 left-0">
        //   <button>
        //     <AiFillCloseCircle
        //       className="h-10 w-10 hover:scale-105 absolute top-10 right-10"
        //       onClick={() => setSlideShow(false)}
        //     />

        //     <BiChevronLeftCircle className="h-10 w-10 hover:scale-105 absolute top-1/2 left-10" />
        //     <BiChevronRightCircle className="h-10 w-10 hover:scale-105 absolute  top-1/2 right-10" />
        //   </button>
        // </div>
        <div className="slide_show glassmorphism  absolute top-0 left-0">
          <ImageCarousel images={images} />
        </div>
      )}

      <div className="prompt_layout">
        {images.map((image) => (
          <ImageThumb key={image._id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default PictureFeed;
