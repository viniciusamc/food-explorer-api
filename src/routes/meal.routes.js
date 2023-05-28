const { Router } = require("express");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const mealsRoutes = Router();

const MealsController = require("../controllers/MealsController");
const mealController = new MealsController();

const multer = require("multer");
const uploadConfig = require("../configs/upload");
const upload = multer(uploadConfig.MULTER);

mealsRoutes.post("/", upload.single("image"), mealController.create);
mealsRoutes.get("/details/:id", mealController.get);
mealsRoutes.delete("/:id", ensureAuthenticated, mealController.delete);
mealsRoutes.get("/", mealController.index);
mealsRoutes.put("/:id", upload.single("image"), mealController.update);

module.exports = mealsRoutes;
