import { connectToDB } from "@/utils/database";
import User from "@/models/user";

// get all users
export const GET = async (request) => {
  try {
    await connectToDB();
    const users = await User.find();
    // console.log(foundUsers);
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("failed to fetch all albums", { status: 500 });
  }
};
// add album to user
export const PATCH = async (request) => {
  const { userId, albumId } = await request.json();
  try {
    await connectToDB();
    const user = await User.findById(userId);
    if (!user.albums.includes(albumId)) {
      user.albums.push(albumId);
    }
    await user.save();
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("failed to = share album", { status: 500 });
  }
};
