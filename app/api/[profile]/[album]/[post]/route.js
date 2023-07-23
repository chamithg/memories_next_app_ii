import { connectToDB } from "@/utils/database";
import Post from "@/models/post";
import Album from "@/models/album";
import Image from "@/models/image";

// this will handle deleting + editing a collection

// deleting a collection
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

// editing a collection
export const PATCH = async (request, { params }) => {
  const { desc, postname } = await request.json();
  try {
    await connectToDB();
    // Find the existing Post/collection by ID
    const existingPost = await Post.findById(params.post);
    if (!existingPost) {
      return new Response("Post not found", { status: 404 });
    }
    // Update the post with new data
    existingPost.postname = postname;
    existingPost.desc = desc;
    await existingPost.save();
    return new Response("Successfully updated the Post", { status: 200 });
  } catch (error) {
    return new Response("Error Updating the Post", { status: 500 });
  }
};
