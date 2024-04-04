const catchAsync = require("../utils/catchAsync");
const Task = require("../models/taskModel");
// "/"
// Get Tasks
exports.getAllTasks = catchAsync(async (req, res) => {
	try {
		// res.send("Get All Tasks Working");
		const tasks = await Task.find({});
		res.send(tasks);
	} catch (error) {
		console.error("An error occured in the database", error);
	}
});

// Get a single Task
exports.createTask = catchAsync(async (req, res) => {
	try {
		// res.send("Create A Task Working");
		const { title, description, dueDate, points } = req.body;

		const task = await Task.create({
			title,
			description,
			dueDate,
			points,
		});

		res.send(task);
	} catch (error) {
		console.error("An error occured in the database", error);
	}
});

// "/:id"
// Add a single Task
exports.getTask = catchAsync(async (req, res) => {
	try {
		// res.send("Get A Task Working");
		const id = req.params.id;
		const task = await Task.findById(id);
		if (!task) {
			res.send(`Task of id: ${id} could not be found`);
		}
		res.send(task);
	} catch (error) {
		console.error("An error occured in the database", error);
	}
});

// Delete a task
exports.updateTask = catchAsync(async (req, res) => {
	try {
		// res.send("Update A Task Working");
		const id = req.params.id;
		await Task.findByIdAndUpdate(id, req.body);
		// if(!task) {
		//     res.send(`Task of id: ${id} could not be found`)
		// }
		res.send(`Task of id: ${id} was updated successfully`);
	} catch (error) {
		console.error("An error occured in the database", error);
	}
});

// Update (complete) a task
exports.deleteTask = catchAsync(async (req, res) => {
	try {
		// res.send("Delete A Task Working");
		const id = req.params.id;
		await Task.findByIdAndDelete(id);
		// if(!task) {
		//     res.send(`Task of id: ${id} could not be found`)
		// }
		res.send(`Task of id: ${id} was deleted successfully`);
	} catch (error) {
		console.error("An error occured in the database", error);
	}
});
