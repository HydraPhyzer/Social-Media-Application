import mongoose, { Mongoose, Schema } from "mongoose";

const NotificationSchema = new Schema({
  SenderID: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  Type: {
    type: Number,
  },
});

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
    Requests: {
      type: Array,
      default: [],
    },
    PicturePath: {
      type: String,
      default: "",
    },
    // Notifications: {
    //   Unread: {
    //     type: [{ SenderID: String, Type: Number }],
    //     default: [],
    //   },
    //   Read: {
    //     type: [{ SenderID: String, Type: Number }],
    //     default: [],
    //   },
    // },
    Notifications: {
      Unread: {
        type: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
        default: [],
      },
      Read: {
        type: [{ type: Schema.Types.ObjectId, ref: "Notification" }],
        default: [],
      },
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);
const User = mongoose.model("User", UserSchema);
// export default User;
export { User, Notification };
