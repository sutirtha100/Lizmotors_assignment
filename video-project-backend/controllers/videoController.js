const Video = require("../models/Video");
const UserProgress = require("../models/UserProgress");

// Get all videos
exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Error fetching videos", error: error.message || error });
  }
};

// Get video by ID
exports.getVideoById = async (req, res) => {
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
};

// Save user progress
exports.saveUserProgress = async (req, res) => {
  const { userId, videoId, playedSeconds, completed } = req.body;

  try {
    let userProgress = await UserProgress.findOne({ userId, videoId });

    if (userProgress) {
      userProgress.playedSeconds = playedSeconds;
      userProgress.completed = completed || userProgress.completed;
      userProgress.lastWatched = Date.now();
    } else {
      userProgress = new UserProgress({
        userId,
        videoId,
        playedSeconds,
        completed,
      });
    }

    await userProgress.save();
    res.json({ message: "Progress saved", userProgress });
  } catch (error) {
    console.error("Error saving progress:", error);
    res.status(500).json({ message: "Error saving progress", error: error.message || error });
  }
};
