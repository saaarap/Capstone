const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comments: {
      type: String,
    },
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model("commentModel", CommentSchema, "comments");
