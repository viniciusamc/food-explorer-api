const { Router } = require("express");

const usersRoutes = Router();

const UserController = require("../controllers/UsersController");

const userController = new UserController();

function myMiddleware(req, res, next){
  console.log("passou");
  next()
}

usersRoutes.post("/", myMiddleware ,userController.create)  


module.exports = usersRoutes;
