const { Router } = require("express");

const taskController = require("../controllers/taskController");
const taskRouter = Router();

taskRouter
	.route("/")
	.get(taskController.getAllTasks)
	.post(taskController.createTask);

taskRouter
	.route("/:id")
	.get(taskController.getTask)
	.put(taskController.updateTask)
	.delete(taskController.deleteTask);

module.exports = taskRouter;
