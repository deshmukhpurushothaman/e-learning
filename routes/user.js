const express = require("express");
const {
  userById,
  userBySlug,
  allUsers,
  getUser,
  updateUserProgress,
  deleteUser,
  userPhoto,
  hasAuthorization,
  updateUser,
  contactUs
} = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");

//Initializing Router
const router = express.Router();

//params
//@desc Fetches the User Information based on the UserID
router.param("userId",  userById);

//params
//@desc Fetches the User Information based on the userSlug
//router.param("userSlug", userBySlug);

//Routers

//@path     GET  /api/user/all
//@desc     Get all the Users
//@access   PUBLIC
//router.get("/all", allUsers);

//@path     GET  /api/user/:userSlug
//@desc     Get user by userSlug
//@access   Private

router.put("/contact", contactUs)
router.get("/:userId", getUser);



//@path     PUT  /api/user/progress/:userId
//@desc     Update user Record on Courses. Only User can Update his Details
//@access   Private


router.put("/progress/:userId",  updateUserProgress);

router.put("/:userId",  updateUser)



//@path     DELTE  /api/user/:userId
//@desc     Delete user Record. Only User/Admin can Delete the Record
//@access   PUBLIC
//router.delete("/:userId", requireSignin, hasAuthorization, deleteUser);

module.exports = router;
