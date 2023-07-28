import { connectToDB } from "@/utils/database";
import Album from "@/models/album";
export const POST = async (req, res) => {
  const { userId, albumname, desc, coverImage, code } = await req.json();

  try {
    await connectToDB();
    const newAlbum = new Album({
      creator: userId,
      albumname,
      desc,
      coverImage: coverImage.base64,
      code: code,
    });
    await newAlbum.save();
    return new Response(JSON.stringify(newAlbum), { status: 201 });
  } catch (error) {
    return new Response("failed to create a new Album", { status: 500 });
  }
};
