const { Router } = require("express");

const cartRoutes = Router();

const CartController = require("../controllers/CartController");

const cartController = new CartController();

cartRoutes.post("/", cartController.create);

module.exports = cartRoutes;
