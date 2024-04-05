const { Router } = require("express");

const userController = require("../controllers/userController");
const userRouter = Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.get("/logout", userController.protect, userController.logout);

module.exports = userRouter;
