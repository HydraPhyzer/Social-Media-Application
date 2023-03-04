import Mongoose, { Schema } from "mongoose";

const PostSchema = new Mongoose.Schema(
  {
    UserId: {
      type: String,
      required: true,
    },
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },

    Description: String,
    PostPicturePath: String,
    UserPicturePath: String,

    Likes: {
      type: Map,
      of: Boolean,
    },

    Comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = Mongoose.model("Post", PostSchema);

export default Post;
