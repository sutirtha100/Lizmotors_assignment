const mongoose = require("mongoose");

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
    ref: "Video",
    required: true,
  },
  playedSeconds: {
    type: Number,
    default: 0,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  lastWatched: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserProgress", userProgressSchema);
