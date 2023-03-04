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
import User from "./Schema/User";
import Post from "./Schema/Post"
import console from "console";
// Require Statements
let Cors = require("cors");
let Morgan = require("morgan");
const Multer = require("multer");
let App = Express();
let JWT = require("jsonwebtoken");
const PORT = process.env.PORT || 7001;

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
App.use(Helmet());
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

//Mongo Connection

// Resuest Section
App.get("/", (Req, Res) => {
  Res.send("Hello World");
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
App.post("/createpost", Upload.single("Image"), async (Req, Res) => {
  try {
    const { UserId, Description } = Req.body;
    const FetchUser = await User.findOne({ _id: UserId });
    if (FetchUser) {
      const { FirstName, LastName, PicturePath:UserPicturePath}=FetchUser;
      const PostPicturePath=Req.body?.PicturePath? ImageCode + Path.extname(Req.body?.PicturePath):"";

      const NewPost=await new Post({FirstName,LastName,Description,UserPicturePath,UserId,PostPicturePath})
      .save()
      .then(async()=>{
        let AllPost=await Post.find();
        Res.status(201).json(AllPost);
      })
    }
  } catch (Error) {
    Res.status(400).json({Error:"Unable to Upload Post"});
  }
});

//Testing Multer
App.post("/stats", Upload.single("Image"), function (req, res) {
  console.log(req.file, req.body);
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
