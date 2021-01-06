const express = require("express");
const {
  userById,
  userBySlug,
  allUsers,
  getUser,
  updateUser,
  deleteUser,
  userPhoto,
  hasAuthorization,
} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");

//Initializing Router
const router = express.Router();

//params
//@desc Fetches the User Information based on the UserID
router.param("userId", userById);

//params
//@desc Fetches the User Information based on the userSlug
router.param("userSlug", userBySlug);

//Routers

//@path     GET  /api/user/all
//@desc     Get all the Users
//@access   PUBLIC
//router.get("/all", allUsers);

//@path     GET  /api/user/:userSlug
//@desc     Get user by userSlug
//@access   Private
router.get("/:userId", requireSignin, getUser);

//@path     GET  /api/user/photo/:userId
//@desc     Get  User Phot
//@access   PUBLIC
router.get("/photo/:userId", userPhoto);

//@path     PUT  /api/user/:userId
//@desc     Update user Record. Only User can Update his Details
//@access   PUBLIC
router.put("/:userId", requireSignin, hasAuthorization, updateUser);

//@path     DELTE  /api/user/:userId
//@desc     Delete user Record. Only User/Admin can Delete the Record
//@access   PUBLIC
router.delete("/:userId", requireSignin, hasAuthorization, deleteUser);

module.exports = router;
