import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ImageCarousel = ({ images, setSlideShow }) => {
  return (
    <Carousel className="glassmorphism_3">
      {images.map((image) => (
        <div className="bg-contain bg-center">
          <img
            src={image.image}
            alt="uploaded_images"
            className="object-contain max-h-[70vh] rounded-md shadow-md"
          />
          <p className="legend">{image.caption}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
