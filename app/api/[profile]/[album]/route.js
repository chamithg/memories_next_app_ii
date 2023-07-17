import { connectToDB } from "@/utils/database";
import Post from "@/models/post";
import Album from "@/models/album";
import Image from "@/models/image";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const posts = await Post.find({ album: params.album });
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all posts", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    // DELETE ALBUM
    const album = await Album.findByIdAndDelete(params.album);

    // FIND ALL POST OF THAT ALBUM
    const foundPosts = await Post.find({ album: params.album });
    // ITERATE OVER THE POSTS AND DELETE ALL IMAGES
    for (let i = 0; i < foundPosts.length; i++) {
      console.log(foundPosts[i]._id);
      const image = await Image.deleteMany({ post: foundPosts[i]._id });
    }
    // DELETE POSTS(COLLECTIONS)
    const posts = await Post.deleteMany({ album: params.album });

    return new Response(JSON.stringify(album), JSON.stringify(posts), {
      status: 200,
    });
  } catch (error) {
    return new Response("failed to delate all posts", { status: 500 });
  }
};
