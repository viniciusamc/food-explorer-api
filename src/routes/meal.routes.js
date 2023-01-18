const { Router } = require("express");

const mealsRoutes = Router();

const MealsController = require("../controllers/MealsController");

const mealsController = new MealsController();

function myMiddleware(req, res, next){
  next()
}

usersRoutes.post("/", myMiddleware ,mealsController.create)  

module.exports = usersRoutes;
