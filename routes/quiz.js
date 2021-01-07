const express = require("express");
const { createForm, getQuiz, getQuizById, updateQuiz, deleteQuiz } = require("../controllers/FormService")

const router = express.Router();

//@desc Fetches the User Information based on the UserID
//router.param("userId", userById);

//Routers

router.put("/update/:quizId", updateQuiz)

router.post("/createquiz",  createForm);
//router.put("/unlike", unlike);

router.get("/:quizId", getQuizById)

router.get("/courses/:course", getQuiz);



router.delete("/:quizId", deleteQuiz);

module.exports = router;