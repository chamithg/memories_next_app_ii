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
  desc: {
    type: String,
    required: [true, "Description is required!"],
  },
  image: {
    type: String,
  },
});

const Image = models.Image || model("Image", ImageSchema);
export default Image;
