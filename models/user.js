const mongoose = require("mongoose");
const uuidv1 = require("uuidv1");
const crypto = require("crypto");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
  role: {
    type: Number,
    default: 1,
  },
  python: {
    type: Number,
    default: 0,
  },
  flutter: {
    type: Number,
    default: 0,
  },
  dart: {
    type: Number,
    default: 0,
  },
  // profile_status: {
  //   type: Number,
  //   default: 1,
  // },
  // social_links: {
  //   youtube: {
  //     type: String,
  //   },
  //   linkedin: {
  //     type: String,
  //   },
  // },
  // bio: {
  //   type: String,
  //   trim: true,
  // },
  // slug: {
  //   type: String,
  //   index: true,
  //   require: true,
  //   unique: true,
  // },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: {
    type: Date,
  },
  // photo: {
  //   type: String,
  // },
  // bookmark: [
  //   {
  //     type: ObjectId,
  //     ref: "Post",
  //   },
  // ],
});

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);