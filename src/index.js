const express = require("express");
const taskRouter = require("./routes/taskRouter");
const authRouter = require("./routes/authRouter");

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/tasks", taskRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
	console.log(err.stack);
	res.status(500).send("Internal Server Error");
});
app.get("/", (req, res) => {
	res.send("Welcome to your web application!");
});

module.exports = app;
