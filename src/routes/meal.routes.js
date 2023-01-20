const { Router } = require("express");

const mealsRoutes = Router();

const MealsController = require("../controllers/MealsController");

const mealController = new MealsController();

function myMiddleware(req, res, next){
  next()
}

mealsRoutes.post("/", myMiddleware, mealController.create)  
mealsRoutes.get("/:id", myMiddleware, mealController.get)  
mealsRoutes.delete("/:id", myMiddleware, mealController.delete)  

module.exports = mealsRoutes;
