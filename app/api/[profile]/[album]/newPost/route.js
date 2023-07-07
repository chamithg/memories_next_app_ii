import { connectToDB } from "@/utils/database";
import Post from "@/models/post";
export const POST = async (req, res) => {
  const { album, postname, desc } = await req.json();
  console.log("hello");

  try {
    await connectToDB();
    const newPost = new Post({
      album: album,
      postname,
      desc,
    });
    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response("failed to create a new Album", { status: 500 });
  }
};
