const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const User = require("../models/user");
const _ = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const slugify = require("slugify");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("0123456789", 5);
const dotenv = require("dotenv");
const { sendEmail } = require("../helpers");
const CLIENT_URL = "http://localhost:3000"
const JWT_SECRET = "asdfasdfasdf";
dotenv.config();

exports.roleLabel = (role) => {
  let roleLabel;
  if (role === 1) {
    roleLabel = "user";
  } else if (role === 404) {
    roleLabel = "admin";
  }

  return roleLabel;
};

//@desc  -  SignUp controller
//@Usage -  Will be used when application accepts Username and Password from User
exports.signup = async (req, res, next) => {
  const userExists = await User.findOne({ email: req.body.email });
  console.log("user exists", req.body.email)

  if (userExists)
    return res.status(403).json({
      error: "An user with this email already exists!",
    });
  const user = await new User(req.body);
  await user.save();
  res.status(200).json({ message: "Signup success! Please login." });
  next();
};

//@desc  -  SignIn controller
//@Usage -  Will be used when application accepts Username and Password from User
exports.signin = (req, res) => {
  const { email, password } = req.body;
  console.log("Signin", req.body)
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: "User with that email does not exist. Please signup.",
      });
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECERT
    );
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

//@desc  -  Signs Out User from Appication
//@Usage -  Will be used when application accepts Username and Password from User
exports.signout = (req, res) => {
  res.clearCookie("t");
  return res.json({ message: "Signout success!" });
};

//@desc  -  Checks whether the user is signed In or not based on the token
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECERT,
  algorithms: ["HS256"],
  userProperty: "auth",
});

//@desc  -  Google Login Controller
//@Usage -  1. Will create a New user record in DB if the user is not available in DB and send the jwt
//          2. Will verify if the user is already available and sends the jwt token
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);
exports.socialLogin = async (req, res) => {
  const idToken = req.body.tokenId;
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  });
  const {
    email_verified,
    email,
    name,
    picture,
    sub: googleid,
  } = ticket.getPayload();

  if (email_verified) {
    console.log(`email_verified > ${email_verified}`);
    const email_address = email;
    const username = name;
    const photo = picture;
    const newUser = { email_address, username, photo, password: googleid };
    // try signup by finding user with req.email
    let user = User.findOne({ email_address }, async (err, user) => {
      if (err || !user) {
        // create a new user and login
        newUser.slug =
          slugify(user.username, { lower: true, strict: true }) +
          "-" +
          nanoid().toLowerCase();
        user = new User(newUser);
        req.profile = user;
        await user.save();

        console.log(this.roleLabel(user.role));
        // generate a token with user id and secret
        const token = jwt.sign(
          {
            _id: user._id,
            role: this.roleLabel(user.role),
            iss: process.env.APP_NAME,
          },
          process.env.JWT_SECERT,
          { expiresIn: "7d" }
        );

        res.cookie("t", token, { expire: new Date() + 7 });

        // return response with user and token to frontend client
        const { _id, username, slug } = user;
        return res.json({ token, user: { _id, username, user_id: slug } });
      } else {
        // update existing user with new social info and login
        req.profile = user;
        user = _.extend(user, newUser);
        user.updated = Date.now();
        await user.save();

        // generate a token with user id and secret
        const token = jwt.sign(
          {
            _id: user._id,
            role: this.roleLabel(user.role),
            iss: process.env.APP_NAME,
          },
          process.env.JWT_SECERT,
          { expiresIn: "7d" }
        );

        res.cookie("t", token, { expire: new Date() + 7 });

        // return response with user and token to frontend client
        const { _id, username, slug } = user;
        return res.json({ token, user: { _id, username, user_id: slug } });
      }
    });
  }
};

// Check if a user is admin
exports.isAdmin = (req, res, next) => {
  // console.log(req.auth);
  if (!(req.auth.role === "admin")) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied",
    });
  }
  next();
};


 // add forgotPassword and resetPassword methods
 exports.forgotPassword = (req, res) => {
  if (!req.body) return res.status(400).json({ message: "No request body" });
  if (!req.body.email)
      return res.status(400).json({ message: "No Email in request body" });

  console.log("forgot password finding user with that email");
  const { email } = req.body;
  console.log("signin req.body", email);
  // find the user based on email
  User.findOne({ email }, (err, user) => {
      // if err or no user
      if (err || !user)
          return res.status("401").json({
              error: "User with that email does not exist!"
          });

      // generate a token with user id and secret
      const token = jwt.sign(
          { _id: user._id, iss: "NODEAPI" },
          JWT_SECRET
      );

      // email data
      const emailData = {
          from: "deshmukhpurushothaman@gmail.com",
          to: email,
          subject: "Password Reset Instructions",
          text: `Please use the following link to reset your password: ${
              CLIENT_URL
          }/reset-password/${token}`,
          html: `<p>Please use the following link to reset your password:</p> <p>${
              CLIENT_URL
          }/reset-password/${token}</p>`
      };

      return user.updateOne({ resetPasswordLink: token }, (err, success) => {
          if (err) {
              return res.json({ message: err });
          } else {
              sendEmail(emailData);
              return res.status(200).json({
                  message: `Email has been sent to ${email}. Follow the instructions to reset your password.`
              });
          }
      });
  });
};

// to allow user to reset password
// first you will find the user in the database with user's resetPasswordLink
// user model's resetPasswordLink's value must match the token
// if the user's resetPasswordLink(token) matches the incoming req.body.resetPasswordLink(token)
// then we got the right user

exports.resetPassword = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;

  User.findOne({ resetPasswordLink }, (err, user) => {
      // if err or no user
      if (err || !user)
          return res.status("401").json({
              error: "Invalid Link!"
          });

      const updatedFields = {
          password: newPassword,
          resetPasswordLink: ""
      };

      user = _.extend(user, updatedFields);
      user.updated = Date.now();

      user.save((err, result) => {
          if (err) {
              return res.status(400).json({
                  error: err
              });
          }
          res.json({
              message: `Great! Now you can login with your new password.`
          });
      });
  });
};

