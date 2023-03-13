const { Router } = require("express");

const usersRoutes = Router();

const UserController = require("../controllers/UsersController");

const userController = new UserController();

function myMiddleware(req, res, next) {
  const { admin } = req.body;
  next();
}

usersRoutes.post("/", myMiddleware, userController.create);
usersRoutes.get("/:id", myMiddleware, userController.show);

module.exports = usersRoutes;
