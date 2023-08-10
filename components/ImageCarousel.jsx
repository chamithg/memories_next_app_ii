import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { BsGrid } from "react-icons/bs";

const ImageCarousel = ({ images, viewComments, setSlideView }) => {
  return (
    <div className="fixed top-0 left-0 z-40 ">
      <button
        className="absolute top-3 left-3 z-40 grad_btn_pink"
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
