import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { BsGrid } from "react-icons/bs";

const ImageCarousel = ({ images, viewComments, setSlideView }) => {
  return (
    <div className="fixed top-0 left-0 z-50 ">
      <button
        className="absolute top-3 left-3 z-50 grad_btn_pink"
        onClick={() => setSlideView(false)}>
        <BsGrid />
      </button>
      <Carousel className="fixed  bg-black w-screen h-screen top-0 left-0">
        {images.map((image) => (
          <div className="relative bg-contain bg-center">
            <img
              src={image.image}
              alt="uploaded_images"
              className="object-contain h-screen rounded-md shadow-md"
            />
            {/* max-h-[70vh] */}
            <div className="absolute top-10 left-1/4 -translate-x-1/2 h-3/4  overflow-y-scroll scrollbar-hide ">
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
                      <p className="ml-5 font-mono break-words text-white text-base w-60">
                        {comment.split(":>")[2]}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className=" bg-slate-500 w-3/6">
              <p className="legend glassmorphism_wp">
                <h1 className="text-xl font-mono">{image.caption}</h1>
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
