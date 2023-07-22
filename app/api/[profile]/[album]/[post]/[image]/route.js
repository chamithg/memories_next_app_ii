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
