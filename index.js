const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const { engine } = require("express-handlebars");
require("dotenv").config();

const taskRouter = require("./routes/taskRouter");
const userRouter = require("./routes/userRouter");

const dbConnect = require("./utils/database");

const port = process.env.PORT || 3000;
const app = express();

app.engine(
	"hbs",
	engine({
		layoutsDir: `${__dirname}/views/layouts`,
		extname: "hbs",
		defaultLayout: "index",
		partialsDir: `${__dirname}/views/partials`,
	})
);
app.set("view engine", "hbs");
app.set("views", "./views");

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser(process.env.SECRET));

app.use("/api/tasks", taskRouter);
app.use("/api/user", userRouter);

// app.use((err, req, res, next) => {
// 	console.log(err.stack);
// 	res.status(500).send("Internal Server Error");
// });

app.get("/", (req, res) => {
	const title = "TaskBloc";
	const users = ["David", "Joseph", "Grace", "Damola"];
	res.render("home");
});

app.get("/login", (req, res) => {
	res.render("login");
});

app.get("/signup", (req, res) => {
	res.render("signup");
});

// module.exports = app;

dbConnect();

app.listen(port, (req, res) => {
	console.log("Server running on port:", port);
});
