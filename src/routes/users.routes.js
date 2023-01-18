const { Router } = require("express");

const usersRoutes = Router();

const UserController = require("../controllers/UsersController");

const userController = new UserController();

function myMiddleware(req, res, next){
  next()
}

usersRoutes.post("/", myMiddleware ,userController.create)  
usersRoutes.put("/", myMiddleware ,userController.update)  


module.exports = usersRoutes;
