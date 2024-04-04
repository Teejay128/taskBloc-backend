const { Router } = require("express");

const taskController = require("../controllers/taskController");
const taskRouter = Router();

taskRouter.route("/").get().post();

taskRouter.route("/:id").get().post().put().delete();

module.exports = taskRouter;
