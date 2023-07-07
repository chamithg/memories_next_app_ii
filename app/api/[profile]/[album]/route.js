import { connectToDB } from "@/utils/database";
import Post from "@/models/post";

export const GET = async (request, { params }) => {
  console.log("get called", params);

  try {
    await connectToDB();
    const posts = await Post.find({ album: params.album });
    console.log("get called", posts);
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all posts", { status: 500 });
  }
};
