const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const CartController = require("../controllers/CartController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const cartRoutes = Router();
const upload = multer(uploadConfig.MULTER);

const cartController = new CartController();

cartRoutes.post("/", cartController.create);
cartRoutes.delete("/", cartController.delete);
cartRoutes.get("/:id", cartController.index);
cartRoutes.patch(
  "/image",
  ensureAuthenticated,
  upload.single("image"),
  (req, res) => {
    console.log(req.file.filename);
    res.json("Foi");
  }
);

module.exports = cartRoutes;
