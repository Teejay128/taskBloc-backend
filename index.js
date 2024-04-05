const express = require("express");
const cookieParser = require("cookie-parser");
const taskRouter = require("./routes/taskRouter");
const userRouter = require("./routes/userRouter");
const dbConnect = require("./utils/database");
const port = process.env.PORT || 3000;
require("dotenv").config();

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.SECRET));

app.use("/api/tasks", taskRouter);
app.use("/api/user", userRouter);

app.use((err, req, res, next) => {
	console.log(err.stack);
	res.status(500).send("Internal Server Error");
});
app.get("/", (req, res) => {
	res.send("Welcome to your web application!");
});

app.get("/login", (req, res) => {
	res.send("This is the login page");
});

app.get("/signup", (req, res) => {
	res.send("This is the signup page");
});

// module.exports = app;

dbConnect();

app.listen(port, (req, res) => {
	console.log("Server running on port:", port);
});
