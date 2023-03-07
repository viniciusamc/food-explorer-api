const { Router } = require("express");

const cartRoutes = Router();

const CartController = require("../controllers/CartController");

const cartController = new CartController();

cartRoutes.post("/", cartController.create);
cartRoutes.delete("/", cartController.delete);
cartRoutes.get("/:id", cartController.index);

module.exports = cartRoutes;
