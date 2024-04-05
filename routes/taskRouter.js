const { Router } = require("express");

const taskController = require("../controllers/taskController");
const userController = require("../controllers/userController");
const taskRouter = Router();

taskRouter
	.route("/")
	.get(userController.protect, taskController.getAllTasks)
	.post(userController.protect, taskController.createTask);

// Add a route for accessing the tasks of a particular user

taskRouter
	.route("/:id")
	.get(userController.protect, taskController.getTask)
	.put(userController.protect, taskController.updateTask)
	.delete(userController.protect, taskController.deleteTask);

module.exports = taskRouter;
