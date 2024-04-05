const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		validate: {
			validator: (value) => {
				return /^[^\s@]+@[^\s@]+\.[\w]{2,4}$/.test(value);
			},
			message: "Please enter a valid email address",
		},
	},
	phoneNumber: {
		type: String,
		required: true,
		validate: {
			validator: (value) => {
				return /^0[789]\d{9}$/.test(value);
			},
			message: "Please enter a valid Nigerian phone number",
		},
	},
	tasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Task",
		},
	],
	role: {
		type: String,
		enum: ["employer", "worker"],
		default: "worker",
	},
	DOB: {
		type: Date,
		required: true,
		default: Date.now,
	},
	password: {
		type: String,
		required: true,
	},
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const hashedPassword = await bcrypt.hash(this.password, 10);
	this.password = hashedPassword;
	next();
});

userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
