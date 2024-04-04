const { Router } = require("express");

const authController = require("../controllers/authController");
const authRouter = Router();

authRouter.route("/").get().post();

authRouter.route("/:id").get().post().put().delete();

module.exports = authRouter;
