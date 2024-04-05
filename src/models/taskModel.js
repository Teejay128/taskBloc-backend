const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	description: {
		type: String,
		required: true,
		unique: true,
	},
	difficulty: {
		type: String,
		enum: ["beginner", "intermediate", "expert"],
		default: "beginner",
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	status: {
		type: String,
		enum: ["pending", "completed", "expired"],
		default: "pending",
	},
	timePosted: {
		type: Date,
		default: Date.now,
	},
	dueDate: {
		type: Date,
	},
	points: {
		type: Number,
		required: true,
		min: 1,
		max: 10,
	},
});

taskSchema.pre("save", function (next) {
	const now = Date.now();
	if (this.expiryDate < now) {
		this.expiryDate = new Date(now + 3 * 24 * 60 * 60 * 1000);
	}
	next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
