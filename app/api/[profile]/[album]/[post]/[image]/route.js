import { connectToDB } from "@/utils/database";
import Image from "@/models/image";

// getting images
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const images = await Image.find({ post: params.post });

    return new Response(JSON.stringify(images), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all Images", { status: 500 });
  }
};

// delete image--->
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // delete image
    const image = await Image.findByIdAndDelete(params.image);

    return new Response(JSON.stringify(image), {
      status: 200,
    });
  } catch (error) {
    return new Response("failed to delate image", {
      status: 500,
    });
  }
};

// Edit image -->
export const PATCH = async (request, { params }) => {
  const { image, caption } = await request.json();
  try {
    await connectToDB();
    // Find the existing Album by ID
    const existingImage = await Image.findById(params.image);
    if (!existingImage) {
      return new Response("Image not found", { status: 404 });
    }
    // Update the Album with new data
    existingImage.image = image.base64;
    existingImage.caption = caption;
    await existingImage.save();
    return new Response("Successfully updated the Image", { status: 200 });
  } catch (error) {
    return new Response("Error Updating the Image", { status: 500 });
  }
};
