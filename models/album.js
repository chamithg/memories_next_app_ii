import { Schema, model, models } from "mongoose";

const AlbumSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  coverImage: {
    type: String,
  },
  albumname: {
    type: String,
    required: [true, "Album name is required!"],
  },
  desc: {
    type: String,
    required: [true, "Description is required!"],
  },
});

// The "models" object is provided by the Mongoose Library and stores all the registered models.
// If a model named "User" already exists in the
//"models" object, it assigns that existing model to the "User" variable.
// This prevents redefining the model and ensures that the existing model is reused.
//If a model named "User" does not exist in the
//"models" object, the "model" function from Mongoose
//is called to create a new model
// The newly created model is then assigned to the
//"User" variable.

const Album = models.Album || model("Album", AlbumSchema);
export default Album;
