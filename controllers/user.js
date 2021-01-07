const _ = require("lodash");
const User = require("../models/user");
const formidable = require("formidable");
const fs = require("fs");
const normalize = require("normalize-url");


exports.userById = (req, res, next, id) => {
  console.log("User By Id", id)
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.userBySlug = (req, res, next, userSlug) => {
  console.log(userSlug);
  User.findOne({ slug: userSlug }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.hasAuthorization = (req, res, next) => {
  let sameUser = req.profile && req.auth && req.profile._id == req.auth._id;
  let adminUser = req.auth && req.auth.role === "admin";

  const authorized = sameUser || adminUser;

  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized to perform this action",
    });
  }
  next();
};

exports.allUsers = async (req, res) => {
  // get current page from req.query or use default value of 1
  const currentPage = req.query.page || 1;

  // return 10 posts per page or per limit
  const perPage = parseInt(req.query.limit) || 10;

  let filterType = req.query.userId ? { slug: req.query.userId } : {};

  let totalItems;
  const users = await User.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;
      return User.find(filterType)
        .skip((currentPage - 1) * perPage)
        .select("_id username social_links bio slug photo updated created")
        .limit(perPage);
    })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
};

exports.getUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  console.log("User", req.profile)
  return res.json(req.profile);
};

exports.updateUserProgress = (req, res) => {
  let data = req.body;
  let userId = req.params.userId
  console.log("Update User Progress", data)
  User.findOneAndUpdate( { _id: userId }, data ,{new: true} ,(err, result)=>{
    console.log("User Model Method")
    if(err){
        console.log("Error in Updating")
        res.status(500).send(err)
    }
    else{
        console.log("Update Method", result)
        res.status(200).json(result)
    }
});
};

exports.userPhoto = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set(("Content-Type", req.profile.photo.contentType));
    return res.send(req.profile.photo.data);
  }
  next();
};

exports.deleteUser = (req, res) => {
  let user = req.profile;
  console.log("Delete");
  user.remove((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: err,
      });
    }
    return res.json({ message: "User deleted successfully" });
  });
};
