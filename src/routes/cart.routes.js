const { Router } = require("express");


const CartController = require("../controllers/CartController");

const cartRoutes = Router();


const cartController = new CartController();

cartRoutes.post("/", cartController.create);
cartRoutes.delete("/", cartController.delete);
cartRoutes.get("/:id", cartController.index);


module.exports = cartRoutes;
