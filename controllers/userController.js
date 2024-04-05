const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const JWT = require("jsonwebtoken");
const { promisify } = require("util");
require("dotenv").config();

const signToken = (id) => {
	return JWT.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const createSendToken = (user, statusCode, res) => {
	const token = signToken(user._id);
	const cookieOptions = {
		expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
	};

	res.cookie("jwt", token, cookieOptions);
	user.password = undefined;

	res.status(statusCode).json({
		status: "success",
		token,
		data: {
			user,
		},
	});
};

exports.signup = catchAsync(async (req, res, next) => {
	const { name, email, phoneNumber, DOB, password, confirmPassword } =
		req.body;

	if (!(password == confirmPassword)) {
		console.log("Passwords do not match");
		return res.json({
			status: "error",
			message: "Passwords do not match",
			data: {},
		});
	}

	// const user = await User.find({ name: name });
	// console.log(user);
	// if (user == false) {
	// 	// User already exists, redirect to login
	// 	console.log("User already exists");
	// 	return res.redirect("/login");
	// }

	const newUser = await User.create({
		name,
		email,
		phoneNumber,
		DOB,
		password,
	});

	if (!newUser) {
		return res.status(401).json({
			status: "error",
			message: "User not created",
			data: {},
		});
	}

	createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json({
			status: "error",
			message: "Please provide both email and password",
			data: {},
		});
	}
	const user = await User.findOne({ email }).select("+password");
	if (!user || !(await user.correctPassword(password, user.password))) {
		return res.status(401).json({
			status: "error",
			message: "Incorrect email or password",
			data: {},
		});
	}

	createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.split(" ")[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}

	if (!token) {
		console.log("User is not signed in, redirecting to login page");
		// This would get the /login page
		return res.redirect("/login");
	}

	const decoded = await promisify(JWT.verify)(token, process.env.JWT_SECRET);
	if (!decoded) {
		return res.status(401).json({
			status: "error",
			message: "Token is invalid",
			data: {},
		});
	}
	const user = await User.findById(decoded.id);

	if (!user) {
		return res.status(401).json({
			status: "error",
			message: "User does not exist",
			data: {},
		});
	}
	req.user = user;
	next();
});

exports.logout = (req, res) => {
	res.cookie("jwt", "loggedout", {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});

	return res.status(200).json({
		status: "success",
		message: "You have logged out successfully",
	});
};
