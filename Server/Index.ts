//Import Statements
import Express from "express";
import BodyParser from "body-parser";
import Mongoose, { Error } from "mongoose";
import Dotenv from "dotenv";
import Helmet from "helmet";
import Path from "path";
import { fileURLToPath } from "url";
import path from "path";
import { appendFile } from "fs";
import process from "process";
import { v4 as uuidv4 } from "uuid";

import bcrypt from "bcrypt";
import console from "console";
import User from "./Schema/User";
import Post from "./Schema/Post";
import { VerifyToken } from "./Token/JWT";
// Require Statements
let Cors = require("cors");
let Morgan = require("morgan");
const Multer = require("multer");
let App = Express();
let JWT = require("jsonwebtoken");
const PORT = process.env.PORT || 7001;
const FS = require("fs");

// const __Filename=fileURLToPath(require('import-meta').url)
// const __dirname=Path.dirname(__Filename)

// Use Satatements
Mongoose.set("strictQuery", false);
Dotenv.config();
App.use(Express.json());
App.use(Cors());
App.use(BodyParser.json({ limit: "30mb" }));
App.use(BodyParser.urlencoded({ limit: "30mb", extended: true }));
App.use(Morgan("common"));
App.use(
  Helmet({
    crossOriginResourcePolicy: false,
  })
);
App.use("/Assets", Express.static(Path.join(__dirname, "Public/Assets")));
// Code Part

let ImageCode: string = "";
const Storage = Multer.diskStorage({
  destination: function (Req: any, File: any, cb: any) {
    cb(null, "Public/Assets");
  },
  filename: function (Req: any, File: any, cb: any) {
    ImageCode = uuidv4();
    cb(null, ImageCode + Path.extname(File.originalname));
  },
});
const Upload = Multer({ storage: Storage });

const UploadVideo = Multer({
  storage: Storage,
  limits: {
    fileSize: 10000000,
  },
  fileFilter(Req: any, File: any, cb: any) {
    if (!File.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
      return cb(new Error("Please upload a video"));
    }
    cb(undefined, true);
  },
});

const UploadAudio = Multer({ storage: Storage });

// App.post("/uploadvideo", UploadVideo.single("Video"), (Req: any, Res: any) => {
//   try {
//     Res.send(Req.file);
//   } catch (Err: any) {
//     Res.status(400).send({ error: Err.message });
//   }
// });
App.post("/uploadaudio", UploadAudio.single("Audio"), (Req: any, Res: any) => {
  try {
    Res.send(Req.file);
  } catch (Err: any) {
    Res.status(400).send({ error: Err.message });
  }
});

//Mongo Connection
App.get("/", VerifyToken, (Req, Res) => {
  Res.send({ Access: true });
});

// Register New User
App.post("/auth/register", Upload.single("Image"), async (Req, Res) => {
  try {
    const { FirstName, LastName, Email, Password, PicturePath } = Req.body;

    const Salt = await bcrypt.genSalt();
    const PasswordHash = await bcrypt.hash(Password, Salt);

    const NewUser = await new User({
      FirstName,
      LastName,
      Password: PasswordHash,
      Email,
      PicturePath: ImageCode + Path.extname(PicturePath),
    })
      .save()
      .then(() => {
        ImageCode = "";
      });
    Res.status(201).json(NewUser);
  } catch (err) {
    Res.status(500).json({ Error: "Unable to Register New User" });
  }
});

//Login User
App.post("/auth/login", async (Req, Res) => {
  //Getting Data From Frontend
  const { Email, Password } = Req.body;
  //Getting Data From Backend
  const SearchUser = await User.findOne({ Email: Email });
  if (!SearchUser) {
    Res.status(400).json({ Error: "User Not Found" });
    return;
  }
  //Comparing Password
  const PasswordHash = await bcrypt.compare(
    Password,
    SearchUser?.Password ? SearchUser?.Password : "HelloWorld"
  );

  if (!PasswordHash) {
    Res.status(400).json({ Error: "Invalid Credentials" });
    return;
  }
  if (PasswordHash && SearchUser) {
    const Token = JWT.sign({ ID: SearchUser?._id }, "HelloWorld");
    delete SearchUser?.Password;
    Res.status(200).json({ Token, SearchUser });
    console.log(Req.body);
  }
  //Generating Token
});

//Creating Post
App.post(
  "/createpost",
  Upload.single("Image") ||
    UploadVideo.single("Video") ||
    UploadAudio.single("Audio"),
  async (Req, Res) => {
    try {
      const { UserId, Description } = Req.body;
      const FetchUser = await User.findOne({ _id: UserId });
      if (FetchUser) {
        const { FirstName, LastName, PicturePath: UserPicturePath } = FetchUser;
        const PostPicturePath = Req.body?.PicturePath
          ? ImageCode + Path.extname(Req.body?.PicturePath)
          : "";

        const NewPost = await new Post({
          FirstName,
          LastName,
          Description,
          UserPicturePath,
          UserId,
          PostPicturePath,
        })
          .save()
          .then(async () => {
            let AllPost = await Post.find().sort({ createdAt: -1 });
            Res.status(201).json(AllPost);
          });
      }
    } catch (Error) {
      Res.status(400).json({ Error: "Unable to Upload Post" });
    }
  }
);
App.delete("/deletepost/:id", async (Req, Res) => {
  try {
    const Get: any = await Post.findOne({ _id: Req.params?.id });

    if(Get?.PostPicturePath){
      const assetsFolderPath = path.join(__dirname, "Public", "Assets");
      const filePath = path.join(assetsFolderPath, `${Get?.PostPicturePath}`);
  
      FS.unlinkSync(filePath);
    }

    const Del = await Post.deleteOne({ _id: Req.params?.id });
    console.log(Del);
    if (Del.deletedCount === 1) {
      const AllPost = await Post.find().sort({ createdAt: -1 });
      Res.status(204).json(AllPost);
    }
  } catch (Error) {
    Res.status(400).json({ Error: "Unable to Delete Post" });
  }
});
App.get("/getallposts", async (Req, Res) => {
  try {
    let AllPost = await Post.find().sort({ createdAt: -1 });
    Res.status(201).json(AllPost);
  } catch (Error) {
    Res.status(400).json({ Error: "Unable to Upload Post" });
  }
});

//Testing Multer
App.post("/stats", Upload.single("Image"), function (req, res) {
  console.log(req.file, req.body);
});

App.patch("/addfriend", Upload.single("Image"), async (Req, Res) => {
  try {
    const { UserId, FriendId } = Req.body;
    await User.updateOne({ _id: UserId }, { $push: { Friends: FriendId } });

    let Updated = await User.findOne({ _id: UserId });
    console.log(UserId, FriendId);
    Res.status(201).json(Updated);
  } catch (Error) {
    Res.status(400).json({ Error: "Unable to Add Friend" });
  }
});
App.patch("/removefriend", Upload.single("Image"), async (Req, Res) => {
  try {
    const { UserId, FriendId } = Req.body;
    await User.updateOne({ _id: UserId }, { $pull: { Friends: FriendId } });

    let Updated = await User.findOne({ _id: UserId });
    console.log(UserId, FriendId);
    Res.status(201).json(Updated);
  } catch (Error) {
    Res.status(400).json({ Error: "Unable to Add Friend" });
  }
});

// type Inf ={
//   FirstName:string,
//   LastName:string,
//   PicturePath:string,
// }
App.get("/getfriends/:id", async (Req, Res) => {
  try {
    let CustomUser = await User.findOne({ _id: Req.params?.id });
    let IDArrays = CustomUser?.Friends;

    let AllFriends = await User.find({ _id: { $in: IDArrays } }).select(
      "FirstName LastName PicturePath"
    );

    Res.send(AllFriends);
  } catch (Error) {
    Res.status(400).json({ Error: "Unable to Get Friends" });
  }
});
App.post("/likepost/:id", Upload.single("Image"), async (Req, Res) => {
  try {
    const { UserId } = Req.body;
    const { id } = Req.params;

    const FindPost = await Post.findById({ _id: id });
    const IsLiked = FindPost?.Likes?.get(UserId);

    if (IsLiked) {
      FindPost?.Likes?.delete(UserId);
    } else {
      FindPost?.Likes?.set(UserId, true);
    }

    const UpdatedPost = await Post.findByIdAndUpdate(
      id,
      { Likes: FindPost?.Likes },
      { new: true }
    );
    Res.status(200).json(UpdatedPost);
  } catch (Error) {
    Res.status(400).json({ Error: "Unable to Like Post" });
  }
});

App.post("/addcomment/:id", Upload.single("Image"), async (Req, Res) => {
  try {
    const { UserId, Text } = Req.body;
    const { id } = Req.params;
    console.log(Text);

    const FindPost = await Post.findById({ _id: id });
    if (FindPost) {
      FindPost?.Comments.push(Text);
      await FindPost.save();
      Res.status(200).json(FindPost);
    }
  } catch (Error) {
    Res.status(400).json({ Error: "Unable to Like Post" });
  }
});

// App.listen(4500);

Mongoose.connect(process.env.MONGO_URL ? process.env.MONGO_URL : "")
  .then(() => {
    App.listen(PORT, () => {
      console.log(`Server Port Running on http://localhost:${PORT}`);
    });
  })
  .catch((Error: Error) => {
    console.log(`${Error.name} Did Not Conncet`);
  });
