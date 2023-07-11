import { connectToDB } from "@/utils/database";
import Album from "@/models/album";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const albums = await Album.find({ creator: params.profile }).populate(
      "creator"
    );
    return new Response(JSON.stringify(albums), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all albums", { status: 500 });
  }
};
