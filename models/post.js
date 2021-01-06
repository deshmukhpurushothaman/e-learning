const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

//Database Schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 150,
  },
  description: {
    type: String,
    required: true,
    minlength: 50,
  },
  post_type: {
    type: String,
    required: true,
  },
  post_link: {
    type: String,
    required: true,
  },
  toolname: {
    type: String,
  },
  level: {
    type: String,
  },
  status: {
    type: Number,
    default: 1,
  },
  stage: {
    type: Number,
    default: 0,
  },
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
  reject_reason: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
  name: {
    type: String,
  },
  slug: {
    type: String,
    index: true,
    require: true,
    unique: true,
  },
  mtitle: {
    type: String,
  },
  mdesc: {
    type: String,
  },
  likes: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
