import { Schema, model, models } from "mongoose";

const ImageSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  caption: {
    type: String,
    required: [true, "caption is required!"],
  },
  image: {
    type: String,
    required: [true, "Choose an image!"],
  },
  likes: {
    type: [],
  },
  comments: {
    type: [],
  },
});

const Image = models.Image || model("Image", ImageSchema);
export default Image;
