import { connectToDB } from "@/utils/database";
import Post from "@/models/post";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const posts = await Post.find({ album: params.album });
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all posts", { status: 500 });
  }
};
