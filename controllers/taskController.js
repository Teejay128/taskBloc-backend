const catchAsync = require("../utils/catchAsync");
const Task = require("../models/taskModel");
const User = require("../models/userModel");

// To "/" general route
// Get Tasks
exports.getAllTasks = catchAsync(async (req, res) => {
	try {
		// Add pagination and filtering later

		const tasks = await Task.find({});
		res.status(200).json({
			status: "success",
			message: `Returned ${tasks.length} tasks`,
			data: {
				tasks,
			},
		});
	} catch (error) {
		console.error("An error occured while retrieving all tasks:", error);
	}
});

// Get a single Task
exports.createTask = catchAsync(async (req, res) => {
	try {
		const { title, description, dueDate, points } = req.body;

		const task = await Task.create({
			title,
			description,
			poster: req.user.id,
			dueDate,
			points,
		});

		res.status(201).json({
			status: "success",
			message: `Task: ${title}, was created successfully`,
			data: {
				task,
			},
		});
	} catch (error) {
		console.error("An error occured while creating the task:", error);
	}
});

// To "/:id" particular route
// Add a single Task
exports.getTask = catchAsync(async (req, res) => {
	try {
		const id = req.params.id;
		const task = await Task.findById(id);

		if (!task) {
			return res.status(404).json({
				status: "error",
				message: `Task: ${id} could not be found`,
				data: {},
			});
		}
		res.status(200).json({
			status: "successs",
			message: `Task: ${task.title} was retrieved successfully`,
			data: {
				task,
			},
		});
	} catch (error) {
		console.error("An error occured while retrieving the task", error);
	}
});

// Delete a task
exports.updateTask = catchAsync(async (req, res) => {
	try {
		const id = req.params.id;
		const task = await Task.findById(id);

		if (!task) {
			res.send(`Task of id: ${id} could not be found`);
		}

		if (req.user.id !== task.poster) {
			return res.status(401).json({
				status: "error",
				message: "You are not allowed to update this task",
				data: {},
			});
		}

		const updatedTask = await Task.findByIdAndUpdate(id, req.body);

		res.status(200).json({
			status: "success",
			message: `Task of id: ${id} was updated successfully`,
			data: {
				updatedTask,
			},
		});
	} catch (error) {
		console.error("An error occured while updating the task", error);
	}
});

// Update (complete) a task
exports.deleteTask = catchAsync(async (req, res) => {
	try {
		const id = req.params.id;
		const task = await Task.findById(id);

		if (!task) {
			res.send(`Task of id: ${id} could not be found`);
		}

		if (req.user.id !== task.poster) {
			return res.status(401).json({
				status: "error",
				message: "You are not allowed to delete this task",
				data: {},
			});
		}

		const updatedTask = await Task.findByIdAndDelete(id, req.body);

		res.status(200).json({
			status: "success",
			message: `Task of id: ${id} was updated successfully`,
			data: {
				updatedTask,
			},
		});
	} catch (error) {
		console.error("An error occured while deleting the task", error);
	}
});
