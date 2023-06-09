import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema(
  {
    FirstName: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    LastName: {
      type: String,
      require: true,
      min: 2,
      max: 50,
    },
    Email: {
      type: String,
      require: true,
      unique: true,
    },
    Password: {
      type: String,
      require: true,
    },
    Friends: {
      type: Array,
      default: [],
    },
    Requests :{
      type: Array,
      default: [],
    },
    PicturePath: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", UserSchema);
export default User;
