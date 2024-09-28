/** @format */

const express = require("express");
const cors = require("cors");
const db = require("./src/./db/database.js");
const dotenv = require("dotenv");
const Lesson = require("./src/routes/lesson.routes.js");
const Student = require("./src/routes/student.routes.js");
const Exam = require("./src/routes/exam.routes.js");

dotenv.config();

const app = express();
//!! Using React
// Middleware
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     credentials: true,
//   })
// );

//!! Using Angular
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

//Router
app.use("/api", Lesson);
app.use("/api", Student);
app.use("/api", Exam);

db();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port:5000`);
});
