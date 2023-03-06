const { Router } = require("express");

const favRoutes = Router();

const FavoritesController = require("../controllers/FavoritesController");

const favoritesController = new FavoritesController();

favRoutes.post("/", favoritesController.create);

module.exports = favRoutes;
