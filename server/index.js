const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const UserModel = require("./Models/Users");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'))

mongoose
  .connect("mongodb://127.0.0.1:27017/image_upload_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  UserModel.create({ image: req.file.filename }) // Use req.file.filename to save the file name
    .then((user) => res.json(user)) // Send the created user document back as a response
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Failed to upload image" });
    });
});

app.get("/get-images", (req, res) => {
    UserModel.find()
      .then((users) => res.json(users))
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Failed to get images" });
      });
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
