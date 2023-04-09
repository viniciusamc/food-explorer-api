const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const mealsRoutes = Router();

const MealsController = require("../controllers/MealsController");

const mealController = new MealsController();

mealsRoutes.post("/", ensureAuthenticated, mealController.create);
mealsRoutes.get("/list/:id", mealController.get);
mealsRoutes.delete("/:id", ensureAuthenticated, mealController.delete);
mealsRoutes.get("/list", mealController.index);

module.exports = mealsRoutes;
