import { connectToDB } from "@/utils/database";
import Image from "next/image";
export const POST = async (req, res) => {
  const { post, caption, image } = await req.json();
  try {
    await connectToDB();
    const newImage = new Image({
      post: post,
      caption,
      image,
    });
    await newImage.save();
    return new Response(JSON.stringify(newImage), { status: 201 });
  } catch (error) {
    return new Response("failed to add a new image", { status: 500 });
  }
};
