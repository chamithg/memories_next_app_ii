import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const ImageCarousel = ({ images, viewComments }) => {
  return (
    <Carousel className="glassmorphism_3">
      {images.map((image) => (
        <div className="relative bg-contain bg-center">
          <img
            src={image.image}
            alt="uploaded_images"
            className="object-contain max-h-[70vh] rounded-md shadow-md"
          />
          <div className="absolute top-3 left-7 h-3/4  overflow-y-scroll scrollbar-hide ">
            {image.comments.map((comment) => (
              <div className=" ml-5 p-2 m-2 h-fit rounded-md w-fit">
                <div className="flex items-center ">
                  <Image
                    src={`${comment.split(":>")[0]}`}
                    alt="profile"
                    className="rounded-full"
                    width={45}
                    height={45}
                  />
                  <div className="">
                    <h1 className="ml-2 blue_gradient font-satoshi font-semibold capitalize text-lg">
                      {comment.split(":>")[1] + ":"}
                    </h1>
                    <p className="ml-5 font-mono break-words  text-base w-60">
                      {comment.split(":>")[2]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="legend">{image.caption}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
