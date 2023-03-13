const { Router } = require("express");

const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const mealsRoutes = Router();

const MealsController = require("../controllers/MealsController");

const mealController = new MealsController();

function myMiddleware(req, res, next) {
  next();
}

mealsRoutes.post("/", ensureAuthenticated, mealController.create);
mealsRoutes.get("/list:id", myMiddleware, mealController.get);
mealsRoutes.delete("/:id", myMiddleware, mealController.delete);
mealsRoutes.get("/list", myMiddleware, mealController.index);

module.exports = mealsRoutes;
