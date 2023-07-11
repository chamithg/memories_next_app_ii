import { connectToDB } from "@/utils/database";
import Image from "@/models/image";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const images = await Image.find({ post: params.post });

    return new Response(JSON.stringify(images), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all Images", { status: 500 });
  }
};
