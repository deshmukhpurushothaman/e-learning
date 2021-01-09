const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const expressValidator = require("express-validator");
const path = require("path");

//routes path
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const quizRoutes = require("./routes/quiz");
//const postRoutes = require("./routes/post");
//const adminRoutes = require("./routes/admin");

//Read Config
dotenv.config();

//Express Server
const app = express();

//connect to DB
const connectDB = require("./config/db");
connectDB();

//apiDocs
app.get("/", (req,res) => {
  fs.readFile("docs/apiDocs.json", (err,data) => {
    if(err) {
      return res.status(400).json({
        error: err
      })
    }
    const docs = JSON.parse(data)
    res.json(docs);
  })
})

//middleware
app.use(cors());
app.use(cookieparser());
app.use(expressValidator());
app.use(bodyparser.json());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/quiz", quizRoutes);

//app.use("/api/post", postRoutes);
//app.use("/api/admin", adminRoutes);

// Unauthorized Message in case of  Invalid Tokens
app.use(function (err, req, res, next) {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized" });
  }
});

//Serve static assets in production
if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(
    `Server running on ${PORT} - Environment = ********* ${process.env.NODE_ENV} *********`
  );
});
