const { Router } = require("express");

const mealsRoutes = Router();

const MealsController = require("../controllers/MealsController");

const mealController = new MealsController();

function myMiddleware(req, res, next){
  next()
}

mealsRoutes.post("/", myMiddleware ,mealController.create)  

module.exports = mealsRoutes;
