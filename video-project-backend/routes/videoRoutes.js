const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const Video = require("../models/Video");

const router = express.Router();






// Set up multer for file uploads with file validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /mp4|mkv|avi|mov/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only video files are allowed!"));
  }
};

const upload = multer({ storage, fileFilter });

// POST route to upload a video
router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    const { id, title, description, customId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // const videoData = {
    //   title,
    //   description,
    //   url: `../../../video-project-backend/uploads/${req.file.filename}`,
    //   customId: customId || new mongoose.Types.ObjectId().toString(),
    // };

    const videoData = {
      title,
      description,
      url: `http://localhost:5000/uploads/${req.file.filename}`,
      customId: customId || new mongoose.Types.ObjectId().toString(),
    };

    if (id) {
      videoData._id = id;
    }

    if (customId) {
      const existingVideo = await Video.findOne({ customId });
      if (existingVideo) {
        return res.status(400).json({ message: "Video with this customId already exists" });
      }
    }

    const newVideo = new Video(videoData);
    await newVideo.save();

    res.json({
      message: "Video uploaded successfully",
      video: newVideo,
    });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ message: "Error uploading video", error: error.message || error });
  }
});

// GET route to fetch a specific video by ID
router.get("/videos/:id", async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json(video);
  } catch (error) {
    console.error("Error fetching video by ID:", error);
    res.status(500).json({ message: "Error fetching video", error: error.message || error });
  }
});

// GET route to fetch all videos
router.get("/videos", async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Error fetching videos", error: error.message || error });
  }
});

module.exports = router;
