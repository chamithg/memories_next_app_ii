import { connectToDB } from "@/utils/database";
import Post from "@/models/post";
import Album from "@/models/album";
import Image from "@/models/image";

// fetch posts
export const GET = async (request, { params }) => {
  console.log(params);
  try {
    await connectToDB();
    const posts = await Post.find({ album: params.album });

    const album = await Album.findById(params.album);

    return new Response(
      JSON.stringify({ posts: posts, creator: album.creator }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response("failed to fetch all posts", { status: 500 });
  }
};

// delete albums
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

// edit Album
export const PATCH = async (request, { params }) => {
  const { albumname, desc, coverImage } = await request.json();
  try {
    await connectToDB();
    // Find the existing Album by ID
    const existingAlbum = await Album.findById(params.album);
    if (!existingAlbum) {
      return new Response("Album not found", { status: 404 });
    }
    // Update the Album with new data
    existingAlbum.albumname = albumname;
    existingAlbum.desc = desc;
    existingAlbum.coverImage = coverImage;
    await existingAlbum.save();
    return new Response("Successfully updated the Albums", { status: 200 });
  } catch (error) {
    return new Response("Error Updating the Album", { status: 500 });
  }
};
