import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  album: {
    type: Schema.Types.ObjectId,
    ref: "Album",
  },
  postname: {
    type: String,
    required: [true, "Post name is required!"],
  },
  desc: {
    type: String,
    required: [true, "Description is required!"],
  },
});

const Post = models.Post || model("Post", PostSchema);
export default Post;
