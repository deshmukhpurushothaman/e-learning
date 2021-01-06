const express = require('express');
const { signup, signin, signout, socialLogin } = require('../controllers/auth');
const { userSignupValidator, userSigninValidator, } = require('../validator');
const { userById } = require('../controllers/user');
// const { forgotPassword, resetPassword } = require('../controllers/auth')
const { passwordResetValidator } = require('../validator/index')


//Initializing Router
const router = express.Router();

//Routers

//@path     POST  /api/auth/signup
//@desc     SignUP a new User
//@access   PUBLIC
router.post('/signup', userSignupValidator, signup);

//@path     POST  /api/auth/signin
//@desc     User Signin
//@access   PUBLIC
router.post('/signin', userSigninValidator, signin);

//@path     GET /api/auth/signout
//@desc     Signout User
//@access   PUBLIC
router.get('/signout', signout);


//@path     GET /api/auth/sociallogin
//@desc     Google Signin
//@access   PUBLIC
router.post("/social-login", socialLogin)


// password forgot and reset routes
// router.put("/forgot-password", forgotPassword);
// router.put("/reset-password", passwordResetValidator, resetPassword);

module.exports = router;
