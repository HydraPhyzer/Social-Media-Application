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
import console from "console";

// Require Statements
let Cors = require("cors");
let Morgan = require("morgan");
const Multer = require("multer");
let App = Express();
const PORT = process.env.PORT || 6001;

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

let ImageCode: string="";
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
