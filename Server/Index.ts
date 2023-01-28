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
// Require Statements
let Cors = require("cors");
let Morgan = require("morgan");
const Multer = require("multer");
let App = Express();
const PORT = process.env.PORT || 6001;

// const __Filename=fileURLToPath(require('import-meta').url)
// const __dirname=Path.dirname(__Filename)

// Use Satatements
Mongoose.set('strictQuery', false);
Dotenv.config();
App.use(Express.json());
App.use(Cors());
App.use(BodyParser.json({ limit: "30mb" }));
App.use(BodyParser.urlencoded({ limit: "30mb", extended: true }));
App.use(Morgan("common"));
App.use(Helmet());
App.use("/Assets", Express.static(Path.join(__dirname, "Public/Assets")));
// Code Part

const Storage = Multer.diskStorage({
  destination: function (Req: any, File: any, cb: any) {
    cb(null, "Public/Assets");
  },
  filename: function (Req: any, File: any, cb: any) {
    cb(null, File.originalname);
  },
});
const Upload = Multer({ storage: Storage });

//Mongo Connection

// Resuest Section
App.get("/", (Req, Res) => {
  Res.send("Hello World");
});

App.post("/stats", Upload.single("File"), function (req, res) {
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
