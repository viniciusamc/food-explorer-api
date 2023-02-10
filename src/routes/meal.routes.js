const { Router } = require("express");

const mealsRoutes = Router();

const MealsController = require("../controllers/MealsController");

const mealController = new MealsController();

function myMiddleware(req, res, next) {
  next();
}

mealsRoutes.post("/", myMiddleware, mealController.create);
mealsRoutes.get("/list:id", myMiddleware, mealController.get);
mealsRoutes.delete("/:id", myMiddleware, mealController.delete);
mealsRoutes.get("/list", myMiddleware, mealController.index);

module.exports = mealsRoutes;
