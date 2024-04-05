const AppError = require("../utils/appError");
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
	const newUser = await User.create(req.body);
	if (!newUser) return next(new AppError("User not created", 401));
	createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return next(
			new AppError("Please provide both email and password", 400)
		);
	}
	const user = await User.findOne({ email }).select("+password");
	if (!user || !(await user.correctPassword(password, user.password))) {
		return next(new AppError("Incorrect email or password", 401));
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
		// Consider redirecting to login page
		return next(
			new AppError(
				"You are not logged in! Please log in to get access",
				401
			)
		);
	}

	const decoded = await promisify(JWT.verify)(token, process.env.JWT_SECRET);
	if (!decoded) return next(new AppError("Token is invalid", 401));
	const user = await User.findById(decoded.id);

	if (!user) {
		return next(new AppError("User does not exist", 401));
	}
	req.user = user;
	next();
});

exports.logout = (req, res) => {
	res.cookie("jwt", "loggedout", {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});
	res.status(200).json({ status: "success" });
};
