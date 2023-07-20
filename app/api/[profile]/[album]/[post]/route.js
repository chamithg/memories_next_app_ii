import { connectToDB } from "@/utils/database";
import Post from "@/models/post";
import Album from "@/models/album";
import Image from "@/models/image";

// this will handle deleting + editing a collection
export const DELETE = async (request, { params }) => {
  console.log(params);
  try {
    await connectToDB();

    // delete post
    const posts = await Post.findByIdAndDelete(params.post);
    // delete images attached to that posts
    const images = await Image.deleteMany({ post: params.post });

    return new Response(JSON.stringify(posts), JSON.stringify(images), {
      status: 200,
    });
  } catch (error) {
    return new Response("failed to delate all post or and images", {
      status: 500,
    });
  }
};
