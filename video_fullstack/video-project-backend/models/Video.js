const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema({
  _id: {
    type: String,  // Custom ID type
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  duration: {
    type: Number, // Duration in seconds
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  customId: {
    type: String,
    unique: true,
    sparse: true, // This will allow null values
  },
});

module.exports = mongoose.model("Video", videoSchema);
