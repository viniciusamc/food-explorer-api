const { Router } = require("express");

const favRoutes = Router();

const FavoritesController = require("../controllers/FavoritesController");

const favoritesController = new FavoritesController();

favRoutes.post("/", favoritesController.create);
favRoutes.delete("/", favoritesController.delete);
favRoutes.get("/:id", favoritesController.index);

module.exports = favRoutes;
