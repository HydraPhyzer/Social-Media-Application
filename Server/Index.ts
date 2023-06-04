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
import { Server } from "socket.io";

import bcrypt from "bcrypt";
import console from "console";
import User from "./Schema/User";
import Post from "./Schema/Post";
import Chat from "./Schema/Chat";
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

    if (Get?.PostPicturePath) {
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
    Res.status(400).json({ Error: "Unable to Get Post" });
  }
});
App.get("/getallposts/:userid", async (Req, Res) => {
  try {
    const UserId = Req.params?.userid;
    let AllPost = await Post.find({ UserId: UserId }).sort({ createdAt: -1 });
    Res.status(201).json(AllPost);
  } catch (Error) {
    Res.status(400).json({ Error: "Unable to Get Post" });
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

// App.post("/addmessage", async (Req, Res) => {
//   let Finder = await Chat.findOne({
//     SenderID: Req.body.SenderID,
//     ReceiverID: Req.body.ReceiverID,
//   });
//   console.log(Finder);
//   if (!Finder) {
//     await new Chat({
//       SenderID: Req.body.SenderID,
//       ReceiverID: Req.body.ReceiverID,
//       Messages: [{ MessageText: Req.body.Text, Owner: Req.body.Owner }],
//     })
//       .save()
//       .then(() => {
//         Res.send("Ok");
//       });
//   } else {
//     Finder?.Messages.push({
//       MessageText: Req.body.Text,
//       Owner: Req.body.Owner,
//       timestamp: new Date(),
//     });
//     await Finder.save().then(() => {
//       Res.send("Ok");
//     });
//   }
// });
App.get("/getchats/:SenderID/:ReceiverID", async (Req, Res) => {
  let { SenderID, ReceiverID }: { SenderID: string; ReceiverID: string } =
    Req.params;
  let Result = await Chat.findOne({
    SenderID,
    ReceiverID,
  }).sort({ "Messages.timestamp": 1 });
  let ResultTwo = await Chat.findOne({
    SenderID: ReceiverID,
    ReceiverID: SenderID,
  }).sort({ "Messages.timestamp": 1 });
  if (!Result && !ResultTwo) {
    Result = await new Chat({
      SenderID,
      ReceiverID,
      Messages: [],
    }).save();
  }
  Res.status(200).json(Result || ResultTwo);
});

App.post("/sendmessage", Upload.single("Image"), async (Req, Res) => {
  try {
    let {
      SenderID,
      ReceiverID,
      Message,
    }: { SenderID: string; ReceiverID: string; Message: string } = Req.body;
    console.log(SenderID, ReceiverID, Message);

    let Result = await Chat.findOne({
      SenderID,
      ReceiverID,
    }).sort({ "Messages.timestamp": 1 });
    let ResultTwo = await Chat.findOne({
      SenderID: ReceiverID,
      ReceiverID: SenderID,
    }).sort({ "Messages.timestamp": 1 });
    if (Result) {
      const NewMessage = {
        MessageText: Message,
        Owner: SenderID,
        timestamp: new Date(),
      };
      Chat.findOneAndUpdate(
        { _id: Result._id },
        { $push: { Messages: NewMessage } },
        { new: true },
        async (err, chat) => {
          if (err) {
            Res.status(400).json({ Error: "Cannot Send Message" });
            return;
          } else {
            Res.status(200).json(chat);
          }
        }
      );
    }
    if (ResultTwo) {
      const NewMessage = {
        MessageText: Message,
        Owner: SenderID,
        timestamp: new Date(),
      };
      Chat.findOneAndUpdate(
        { _id: ResultTwo._id },
        { $push: { Messages: NewMessage } },
        { new: true },
        async (err, chat) => {
          if (err) {
            Res.status(400).json({ Error: "Cannot Send Message" });
            return;
          } else {
            Res.status(200).json(chat);
          }
        }
      );
    }
  } catch (Error: any) {
    Res.status(400).json({ Error: "Unable to Send Message" });
  }
});

App.get("/getuser/:id", async (Req, Res) => {
  try {
    let Result = await User.findById({
      _id: Req.params.id,
    });
    if (Result) {
      Res.status(200).json(Result);
    }
  } catch (Err) {
    Res.status(400).json({ Error: "Unable to Fetch Messages" });
  }
});

App.get("/searchuser/:Query", async (Req, Res) => {
  let { Query }: { Query: string } = Req.params;
  try {
    const SearchResult = await User.find({
      $or: [
        { FirstName: { $regex: Query, $options: "i" } },
        { LastName: { $regex: Query, $options: "i" } },
      ],
    });
    Res.status(200).json(SearchResult);
  } catch (Err) {
    Res.status(400).json({ Error: "User Not Found" });
  }
});
App.get("/getsearchuser/:UserId", async (Req, Res) => {
  try {
    const ID = Req.params.UserId;
    const Result = await User.find({ _id: ID });
    const AllPosts = await Post.find({ UserId: ID });
    Res.status(200).json({ UserInfo: Result[0], PostInfo: AllPosts });
  } catch (Err) {
    Res.status(400).json({ Error: "User Not Found" });
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

const io = require("socket.io")(8801, {
  cors: {
    origin: "http://localhost:3000",
  },
});

type NotificationModel = {
  SenderId: string;
  ReceiverId?: string;
  Type: number;
  SocketId: string;
};
let Arr: { UserId: string; SocketId: string }[] = [];
let TempArr: { SenderId: string; ReceiverId: string; SocketId: string }[] = [];
let Notifications = { Unread: [], Read: [] } as {
  Unread: NotificationModel[];
  Read: NotificationModel[];
};

io.on("connection", (Socket: any) => {
  Socket.on("New-OnlineUser", (Val: string) => {
    // if(!Arr.includes(Val)){
    //   Arr.push(Val);
    // }
    if (!Arr.some((User) => User?.UserId === Val)) {
      Arr.push({ UserId: Val, SocketId: Socket?.id });
    }
    // Socket.emit("Get-OnlineUsers", [...Arr]);
    io.emit("Get-OnlineUsers", [...Arr]);
  });

  Socket.on(
    "New-TypingUser",
    ({ SenderId, ReceiverId }: { SenderId: any; ReceiverId: any }) => {
      if (!TempArr.some((User) => User?.SenderId === SenderId)) {
        TempArr.push({ SenderId, ReceiverId, SocketId: Socket?.id });
      }
      Socket.emit("Get-TypingUsers", [...TempArr]);
    }
  );

  Socket.on(
    "Stop-TypingUser",
    ({ SenderId, ReceiverId }: { SenderId: any; ReceiverId: any }) => {
      TempArr = TempArr.filter(
        (User) => User?.SenderId !== SenderId && User?.ReceiverId !== ReceiverId
      );
      Socket.emit("Get-TypingUsers", [...TempArr]);
    }
  );

  Socket.on("Get-TypingUsers", (Val: any) => {
    io.emit("Take-TypingUsers", [...TempArr]);
  });

  Socket.on("Insert-New-Notification",({SenderId,ReceiverId,Type}: {SenderId: string;ReceiverId?: string;Type: number}) => {
      Notifications.Unread.push({SenderId,ReceiverId,Type,SocketId: Socket.id});
      io.emit("Get-Notifications", {...Notifications});
      console.log(Notifications)
    }
  );

  Socket.on("Clear-Notification", () => {
    Notifications.Unread = [];
    Notifications.Read = [];
    io.emit("Get-Notifications", {...Notifications});
  })

  const Cstream=Chat.watch();

  Cstream.on("change", (change: any) => {
    console.log(change.fullDocument);
    io.emit("GetChat",change.fullDocument);
  })

  Socket.on("disconnect", () => {
    Arr = Arr.filter((User) => User?.SocketId !== Socket?.id);
    io.emit("Get-OnlineUsers", [...Arr]);
  });
});
